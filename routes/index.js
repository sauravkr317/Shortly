import express from 'express';
import { urlController } from '../Controller';

const route = express.Router();

// all routes

route.get('/', (req, res, next) => {
    res.status(200).render('index');
});
route.post('/api', urlController.urlPost);
route.get('/api/:shortid', urlController.urlget);

export default route;