import express from "express";
import { CoinListItem, HttpRequestStatusCode } from "../interfaces";

import * as coinService from "../services/coinService";

const searchCoin = async (req: express.Request, res: express.Response) => {
    let { query } = req.query;

    if (!query) {
        return res.status(HttpRequestStatusCode.BadRequest).json("Missing Query string");
    }
    const coin: CoinListItem[] = await coinService.searchCoin(query as string);

    if (!coin || coin.length === 0) {
        return res.status(HttpRequestStatusCode.NotFound).json("No Coin Found");
    }

    return res.status(HttpRequestStatusCode.OK).json(coin);
}

const getCoinInfo = async (req: express.Request, res: express.Response) => {
    let { query } = req.query;

    if (!query) {
        return res.status(HttpRequestStatusCode.BadRequest).json("Missing Query string");
    }

    const coinInfo = await coinService.getCoinInfo(query as string);

    if (!coinInfo) {
        return res.status(HttpRequestStatusCode.NotFound).json("No Coin Found with respective ID");
    }

    return res.status(HttpRequestStatusCode.OK).json(coinInfo);
}

export {
    searchCoin,
    getCoinInfo,
}
