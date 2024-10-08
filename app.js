import cookieParser from 'cookie-parser';
import express from 'express';
import methodOverride from 'method-override';
import morgan from 'morgan';
import {sequelize} from './configs/db.js';
import errorHandler from './middlewares/errorHandler.js';
import router from './routes/index.js';

sequelize.sync();

const app = express();

app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.set('view engine', 'pug');

app.use('/', router);

app.use(errorHandler);

export default app;
