import * as express from 'express';
import * as bodyParser from 'body-parser';

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use('/', router);

router.get('/', (req, res) => {
    res.send('Sup');
});

router.post('/', (req, res) => {
    res.send(req.body);
});

const SERVER_PORT = 5000;

app.listen(SERVER_PORT, () => console.log(`Server is running on http://localhost:${SERVER_PORT}`));