import { ConnectionOptions } from "typeorm";
import entities from "../entities/index";
import migrations from "../seed/index";

const {
  DATABASE_URL,
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME
} = process.env;

const url =
  DATABASE_URL ||
  `postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

const db_config: ConnectionOptions = {
  type: "postgres",
  url,
  synchronize: true,
  logging: false,
  entities,
  migrations
};

export default db_config;
