require('dotenv').config();

import * as express from 'express';
import * as bodyParser from 'body-parser';

import {createConnection} from "typeorm";
import db_config from "./config/orm.config";
import "reflect-metadata";


import  routers from './routers';

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}));

routers(app);


const SERVER_PORT = 5000;

createConnection(db_config)
    .then((connection) => connection.runMigrations())
    .then(() => {
        app.listen(SERVER_PORT, () => console.log(`Server is running on http://localhost:${SERVER_PORT}`));
    })
    .catch(e => console.log(e.message));