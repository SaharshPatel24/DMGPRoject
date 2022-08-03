import express from 'express';
import cors from 'cors';

import { searchCoin, getCoinInfo } from './controller/coinController';

const app: express.Express = express();

const port = process.env.PORT || 5000;

app.use(cors());

app.get('/search', searchCoin);

app.get('/coin-info', getCoinInfo);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});