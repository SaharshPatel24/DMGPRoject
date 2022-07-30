import express from "express";
import axios from "axios";

import * as coinService from "../services/coinService";

const searchCoin = async (req: express.Request, res: express.Response) => {
    let { query } = req.query;

    if (!query) {
        return res.status(400).send("Missing Query string");
    }
    const coin = await coinService.searchCoin(query as string);

    if (!coin || coin.length === 0) {
        return res.status(500).json("No Coin Found");
    }

    return res.status(200).json(coin);
}

const getCoinInfo = async (req: express.Request, res: express.Response) => {
    let { query } = req.query;

    if (!query) {
        return res.status(400).send("Missing Query string");
    }

    try {
        let response = await axios.get(`https://api.coingecko.com/api/v3/coins/${query}`);

        return res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json(error);
        throw new Error(String(error));
    }
}

export {
    searchCoin,
    getCoinInfo,
}
