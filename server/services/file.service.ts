import { Form } from "multiparty";
import { upload } from "./image.service";
import * as base64Img from "base64-img";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";

export const uploadFile = req =>
  new Promise<any>((resolve, reject) => {
    const contentType = req.headers["content-type"];

    if (contentType && contentType.indexOf("multipart") === 0) {
      const form = new Form({
        autoFiles: true,
        uploadDir:
          process.env.NODE_ENV === "production"
            ? path.resolve(`${__dirname}/../../client/build/images`)
            : "public/files",
        maxFilesSize: 1048576 * 3
      });

      form.parse(req, (err, fields, files): any => {
        if (err) {
          return reject(err);
        }
        if (process.env.NODE_ENV === "production") {
          base64Img.base64(path.resolve(files.file[0].path), (error, data) => {
            upload(data)
              .then(url => resolve(url))
              .catch(e => reject(e));
          });
        } else {
          if (files.file) {
            const imageUrl = files.file[0].path;
            let url =
              imageUrl.indexOf("\\") !== -1
                ? imageUrl.split(`\\`)
                : imageUrl.split(`/`);
            url.shift();
            url = url.join("/");

            url = "/" + url;
            return resolve(url);
          }
        }
      });
    } else if (contentType && contentType === "octet-stream") {
      const buffer = [];
      req.on("data", function onRequestData(chunk) {
        buffer.push(chunk);
      });

      req.once("end", () => {
        const concat = Buffer.concat(buffer);
        req.body = JSON.parse(concat.toString("utf8"));
        if (process.env.NODE_ENV === "production") {
          upload(req.body.base)
            .then(url => resolve(url))
            .catch(e => reject(e));
        } else {
          const format = req.body.format.split("/").pop();
          const name = `public/files/${uuid()}.${format}`;
          fs.writeFile(name, req.body.base, "base64", err => {
            if (err) {
              return reject(err);
            }
            return resolve(name);
          });
        }
      });
    } else {
      reject(new Error("Bad request"));
    }
  });
