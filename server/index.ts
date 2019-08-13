require("dotenv").config();

const path = require("path");
const fs = require("fs");
const passport = require("passport");
import * as express from "express";
import * as bodyParser from "body-parser";
const cors = require("cors");
import routes from "./controllers/root.controller";
import authorizationMiddleware from "./middlewares/authorization.middleware";
import errorHandlerMiddleware from "./middlewares/error-handler.middleware";
import routesWhiteList from "./config/routes-white-list.config";
import { createConnection } from "typeorm";
import db_config from "./config/orm.config";
import "reflect-metadata";

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
// app.use("/api/", authorizationMiddleware(routesWhiteList));

routes(app);

app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "production") {
  const staticPath = path.resolve(`${__dirname}/../client/build`);
  app.use(express.static(staticPath));
  app.get("*", (req, res) => {
    res.write(fs.readFileSync(`${__dirname}/../client/build/index.html`));
    res.end();
  });
}

const SERVER_PORT = process.env.PORT || 5000;
app.use(errorHandlerMiddleware);
createConnection(db_config)
  .then(connection => connection.runMigrations())
  .then(() => {
    app.listen(SERVER_PORT, () =>
      console.log(`Server is running on http://localhost:${SERVER_PORT}`)
    );
  })
  .catch(e => console.log(e.message));
