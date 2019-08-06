import {ConnectionOptions} from "typeorm";
import entities from '../entities/index';

const db_config : ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "popcorn",
  synchronize: true,
  logging: false,
  entities
};


export default db_config;