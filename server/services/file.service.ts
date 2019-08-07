import {Form} from "multiparty";

export const uploadFile = req =>
    new Promise<string>((resolve, reject) => {
        const contentType = req.headers['content-type'];


        if (contentType && contentType.indexOf('multipart') === 0) {
            const form = new Form({
                autoFiles: true,
                uploadDir: "public/files"
            });
            form.parse(req, function (err, fields, files): any {
                if (!err)
                    return resolve(files.file[0].path);
                reject(err);

            });
        } else
            reject(new Error("Bad request"))
    });
