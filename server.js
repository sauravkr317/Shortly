import express from 'express';
import { PORT } from './config';
import { errorHandler } from './middleware';
import route from './routes';
import './db/conn';
import ejs from 'ejs';
import path from 'path';

const app = express();
const publicPath = path.join(__dirname, '/public')

app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');

app.use(route);
app.use(errorHandler);

app.listen(PORT || process.env.PORT , () => {
    console.log(`server is running of ${process.env.PORT} port`);
})