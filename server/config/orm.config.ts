import {ConnectionOptions} from "typeorm";

const db_config : ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "popcorn",
  synchronize: true,
  logging: false,
  entities: [
    "entities/*.ts"
  ]
};


export default db_config;