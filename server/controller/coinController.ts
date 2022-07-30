import express from "express";
import axios from "axios";

const searchCoin = async (req: express.Request, res: express.Response) => {
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
