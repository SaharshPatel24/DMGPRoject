import axios from 'axios';

const searchCoin = async (query: string) => {
    try {
        let response = await axios.get(`https://api.coingecko.come/api/v3/search?query=${query}`)

        return response.data.coins;
    } catch (error) {
        console.log(String(error));
    }
}



export { searchCoin }