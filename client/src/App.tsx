import React, { useEffect, useState } from 'react';

import './App.css';

import { Autocomplete, Card, CardActionArea, CardContent, TextField, Typography } from '@mui/material';
import { HttpRequestStatusCode, CoinDetail, CoinListItem } from "./interface/interface";

function App() {
  const [coinsList, setCoinsList] = useState<CoinListItem[]>([]);
  const [error, setError] = useState<string>("");
  const [query, setQuery] = useState<string>("b");
  const [coinDetails, setCoinDetails] = useState<CoinDetail>({
    name: "Crypto Name",
    price: "0.00",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7l1Tzonk76xtsQwjua2FZFPvRcjkiMaQF7g7-iBKJ1h7i4VrbWeGYX2KyniwvUrmmhC4&usqp=CAU",
  });

  const handleOnClick = async (e: React.BaseSyntheticEvent, coinId: String | undefined) => {
    if (coinId === undefined) {
      return setCoinsList([]);
    }
    e.preventDefault();
    try {
      let response = await fetch(`http://localhost:5000/coin-info?query=${coinId}`);
      let coins = await response.json();
      if (response.status === HttpRequestStatusCode.OK) {
        const coinDetail: CoinDetail = {
          name: coins.name,
          price: coins.market_data.current_price.cad,
          imageUrl: coins.image.large,
        }
        setCoinDetails(coinDetail);
      }
    } catch (error) {
      throw Error(String(error));
    }

  }
  useEffect(() => {
    setCoinsList([]);
    setCoinDetails({
      name: "Crypto Name",
      price: "0.00",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7l1Tzonk76xtsQwjua2FZFPvRcjkiMaQF7g7-iBKJ1h7i4VrbWeGYX2KyniwvUrmmhC4&usqp=CAU",
    })
    const fetchCoinsList = async () => {
      try {
        let response = await fetch(`http://localhost:5000/search?query=${query}`);
        let coins: CoinListItem[] | string = await response.json();
        if (response.status === HttpRequestStatusCode.OK) {
          setCoinsList(coins as CoinListItem[]);
          setError("");
        }
        else {
          setError(coins as string);
        }

      } catch (error) {
        setError("Server responsed with resonse status");
        throw new Error(String(error));
      }

    }
    fetchCoinsList();

  }, [query])

  return (
    < div className="App">
      {error
        ?
        <>{error}</>
        :
        <Autocomplete
          data-testid="search-input"
          className="form-search"
          id="clear-on-escape"
          clearOnEscape
          options={coinsList}
          defaultValue={coinsList[10]}
          getOptionLabel={(option) => option.name}
          style={{ width: 600, margin: '30px 20px 10px 20px' }}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          onChange={(e, value) => handleOnClick(e, value?.id)}
          renderInput={(params) => (
            <TextField {...params} label="Search your coins..." onChange={(e) => setQuery(e.target.value)} variant="standard" />
          )}
        />
      }


      < Card
        data-testid="coins-card"
        sx={{
          maxWidth: 345,
          marginTop: "25%",
          width: '100%',
          height: '100%',
          maxHeight: 250,
          position: 'fixed',
        }}>
        <CardActionArea>
          <img
            src={coinDetails.imageUrl}
            alt={coinDetails.name}
            width="100"
            height="100"
            style={{ marginTop: "20px" }} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {coinDetails.name}
            </Typography>
            <Typography variant="h4" color="text.secondary">
              ${coinDetails.price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default App;
