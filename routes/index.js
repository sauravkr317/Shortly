import express from 'express';
import { urlController } from '../Controller';

const route = express.Router();

// all routes

route.get('https://short-url-app.herokuapp.com/', (req, res, next) => {
    res.status(200).render('index');
});
route.post('https://short-url-app.herokuapp.com/api', urlController.urlPost);
route.get('https://short-url-app.herokuapp.com/api/:shortid', urlController.urlget);

export default route;