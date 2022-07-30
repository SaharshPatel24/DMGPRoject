import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app: express.Express = express();

const port = process.env.PORT || 5000;

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/search', async (req: express.Request, res: express.Response) => {
  let { query } = req.query;

  if (!query) {
    return res.status(400).send("Missing Query string");
  }

  try {
    let response = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`);

    return res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error);
    throw new Error(String(error));
  }
});



app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});