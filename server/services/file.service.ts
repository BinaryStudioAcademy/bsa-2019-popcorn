import { Form } from "multiparty";
const uuid = require("uuid/v4");
const fs = require("fs");

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
        console.log(files);
        if (err) return reject(err);

        if (files.file) return resolve(files.file[0].path);

        if (files.image) return resolve(files.image[0].path);
      });
    } else if (contentType && contentType === "octet-stream") {
      const buffer = [];
      req.on("data", function onRequestData(chunk) {
        buffer.push(chunk);
      });

      req.once("end", function() {
        const concat = Buffer.concat(buffer);
        req.body = JSON.parse(concat.toString("utf8"));

        const format = req.body.format.split("/").pop();
        const name = `public/files/${uuid()}.${format}`;
        fs.writeFile(name, req.body.base, "base64", err => {
          if (err) return reject(err);
          return resolve(name);
        });
      });
    } else reject(new Error("Bad request"));
  });
