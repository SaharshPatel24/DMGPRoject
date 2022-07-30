import express from "express";

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

    const coinInfo = await coinService.getCoinInfo(query as string);

    if (!coinInfo) {
        return res.status(500).json("No Coin Found with respective ID");
    }

    return res.status(200).json(coinInfo);
}

export {
    searchCoin,
    getCoinInfo,
}
