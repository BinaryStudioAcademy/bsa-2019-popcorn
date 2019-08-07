import * as express from 'express';
import {uploadFile} from "../services/file.service";

const router = express.Router();

router.post('/upload', (req, res) => {

    uploadFile(req)
        .then(path =>
            res.send({imageUrl: path})
        )
        .catch(e => {
            console.log(e.message);
            res.send({message: e.message});
        });
});


export default router;