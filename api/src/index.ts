import express from 'express';
import dotenv from 'dotenv';
import {SharedClass} from 'shared';

const sharedClassInstance = new SharedClass();

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

app.get('/', (_, res) => {
    res.send(sharedClassInstance.sayHello());
});

process.on('SIGINT', shutdown);

const server = app.listen(port, () => {
    console.info(`Server is running at http://localhost:${port}`);
});

function shutdown() {
    server.close();
}
