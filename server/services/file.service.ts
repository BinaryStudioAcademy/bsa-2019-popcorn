import { Form } from "multiparty";
import { upload } from "./image.service";
const path = require("path");
const fs = require("fs");

export const uploadFile = req =>
  new Promise<any>((resolve, reject) => {
    const contentType = req.headers["content-type"];

    if (contentType && contentType.indexOf("multipart") === 0) {
      const form = new Form({
        autoFiles: true,
        uploadDir: "public/files",
        maxFilesSize: 1048576 * 3
      });
      form.parse(req, (err, fields, files) => {
        if (err) {
          return reject(err);
        }

        const file = Buffer.from(
          fs.readFileSync(path.resolve(files.file[0].path))
        ).toString("base64");
        upload(file)
          .then(url => resolve(url))
          .catch(e => reject(e));
      });
    } else if (contentType && contentType === "octet-stream") {
      const buffer = [];
      req.on("data", function onRequestData(chunk) {
        buffer.push(chunk);
      });

      req.once("end", () => {
        const concat = Buffer.concat(buffer);
        req.body = JSON.parse(concat.toString("utf8"));

        upload(req.body.base)
          .then(url => resolve(url))
          .catch(e => reject(e));
      });
    } else {
      reject(new Error("Bad request"));
    }
  });
