import { Form } from "multiparty";
import { upload } from "./image.service";
const base64Img = require("base64-img");

export const uploadFile = req =>
  new Promise<string>((resolve, reject) => {
    const contentType = req.headers["content-type"];

    if (contentType && contentType.indexOf("multipart") === 0) {
      const form = new Form({
        autoFiles: true,
        uploadDir: "public/files",
        maxFilesSize: 1048576 * 3
      });

      form.parse(req, function(err, fields, files): any {
        if (err) return reject(err);
        if (process.env.NODE_ENV === "production") {
          base64Img.base64(files.file[0].path, function(err, data) {
            upload(data)
              .then(url => resolve(url))
              .catch(e => reject(e));
          });
        } else {
          if (files.file) {
            let imageUrl = files.file[0].path;
            let url;
            url =
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

      req.once("end", function() {
        const concat = Buffer.concat(buffer);
        req.body = JSON.parse(concat.toString("utf8"));

        upload(req.body.base)
          .then(url => resolve(url))
          .catch(e => reject(e));
      });
    } else reject(new Error("Bad request"));
  });
