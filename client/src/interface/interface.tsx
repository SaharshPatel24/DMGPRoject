export enum HttpRequestStatusCode {
    OK = 200,
}

export interface CoinDetail {
    name: string;
    price: string;
    imageUrl: string;
}

export interface CoinListItem {
    id: string;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    large: string;
}
