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


export default db_config;