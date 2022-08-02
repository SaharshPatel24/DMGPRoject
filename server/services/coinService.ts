import axios from 'axios';

const searchCoin = async (query: string) => {
    try {
        let response = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`)

        return response.data.coins;
    } catch (error) {
        console.log(String(error));
    }
}

const getCoinInfo = async (coinId: string) => {
    try {
        let response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`);

        return response.data;
    } catch (error) {
        console.log(String(error));
    }
}

export { searchCoin, getCoinInfo }