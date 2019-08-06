import "reflect-metadata";
import {createConnection} from "typeorm";
import db_config from './config/orm.config';


export default async () => {
    let connection;
    try {
        connection = await createConnection(db_config);
        console.log("Connect to db");
    } catch (e) {
        console.log(e.message)
    }
    return connection;
}