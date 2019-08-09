import {ConnectionOptions} from "typeorm";
import entities from '../entities/index';
import migrations from '../seed/index';

const db_config : ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities,
  migrations
};

const url_db_config : ConnectionOptions =  {
    type: 'postgres',
    url: `postgresql://${process.env.URL_DB_USERNAME}:${process.env.URL_DB_PASSWORD}@${process.env.URL_DB_HOST}/${process.env.URL_DB_NAME}`,
    synchronize: true,
    logging: false,
    entities,
    migrations
}

export default [db_config, url_db_config];