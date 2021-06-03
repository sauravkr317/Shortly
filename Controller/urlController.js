import Joi from 'joi';
import shortid from 'shortid';
import { urls } from '../model';
import { DOMAIN_URL } from '../config'
import { CustomerrorHandler } from '../Services';

const urlController = {
    async urlPost(req, res, next) {

        // validate url
        const urlSchema = Joi.object({
            url: Joi.string().uri().required()
        });

        const { error } = urlSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        // check in database

        try {
            const exist = await urls.exists({ long_url: req.body.url });
            if (exist) {
                const result = await urls.findOne({ long_url: req.body.url }).select('-__v');
                res.json(result);
            } else {
                // store in database
                const { url } = req.body;
                const short_id = shortid.generate();
                const url_id = short_id.replace('-','');
                const short_url = `${DOMAIN_URL}/api/${url_id}`;
                const urlrequest = new urls({
                    long_url: url,
                    short_id: url_id,
                    short_url,
                });

                try {
                    const result = await urlrequest.save();
                    res.json(result);
                } catch (error) {
                    return next(CustomerrorHandler.serverError(error))
                    // return next(CustomerrorHandler.serverError());
                }
            }
        } catch (error) {
            return next(CustomerrorHandler.serverError('error'));
        }
    },

    async urlget(req, res, next) {
        const { shortid } = req.params;
        try {
            const result = await urls.findOne({ short_id: shortid });
            res.redirect(result.long_url);
        } catch (error) {
            return next(CustomerrorHandler.serverError());
        }
    }
}

export default urlController;