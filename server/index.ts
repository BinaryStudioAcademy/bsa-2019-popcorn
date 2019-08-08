require('dotenv').config();

const passport = require('passport');
import * as express from 'express';
import * as bodyParser from 'body-parser';
const cors = require('cors');
import routes from './controllers/root.controller';
import authorizationMiddleware from './middlewares/authorization.middleware';
import errorHandlerMiddleware from './middlewares/error-handler.middleware';
import routesWhiteList from './config/routes-white-list.config';

import {createConnection} from "typeorm";
import db_config from "./config/orm.config";
import "reflect-metadata";

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(passport.initialize());
// app.use('/api/', authorizationMiddleware(routesWhiteList));
routes(app);

app.use(bodyParser.urlencoded({extended:false}));

const SERVER_PORT = 5000;
app.use(errorHandlerMiddleware);
createConnection(db_config)
    .then((connection) => connection.runMigrations())
    .then(() => {
        app.listen(SERVER_PORT, () => console.log(`Server is running on http://localhost:${SERVER_PORT}`));
    })
    .catch(e => console.log(e.message));