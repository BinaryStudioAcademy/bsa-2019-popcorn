import "reflect-metadata";
import {createConnection} from "typeorm";
import db_config from './config/orm.config';


export default async () => {
    let connection;
    try {
        connection = await createConnection(db_config);
    } catch (e) {
        console.log(e)
    }

    console.log(connection);
    return connection;
}