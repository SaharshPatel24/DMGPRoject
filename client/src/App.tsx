import React, { useEffect, useState } from 'react';

import './App.css';

import { Avatar, Card, CardActionArea, CardContent, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

function App() {
  const [coinsList, setCoinsList] = useState([]);
  const [error, setError] = useState([]);
  const [Query, setQuery] = useState('');
  const [coinDetails, setCoinDetails] = useState({
    name: undefined,
    price: undefined,
    imageUrl: undefined,
  });

  const handleOnClick = async (e: any, coinId: String) => {
    e.preventDefault();
    try {
      let response = await fetch(`http://localhost:5000/coin-info?query=${coinId}`);
      let coins = await response.json();
      if (response.status === 200) {
        const coinDetail = {
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
    const fetchCoinsList = async () => {
      try {
        let response = await fetch(`http://localhost:5000/search?query=${Query}`);
        let coins = await response.json();
        if (response.status === 200) {
          setCoinsList(coins);
        }
        else {
          setError(coins);
        }

      } catch (error) {
        throw Error(String(error));
      }

    }
    fetchCoinsList();
  }, [Query])

  return (
    <div className="App">
      <form className="form-search" method="get" action="#">
        <input type="search" name="search" onChange={event => setQuery(event.target.value)} placeholder="search your crypto here ...." />
        <button type="submit">Search</button>
      </form>
      <List
        sx={{
          marginTop: "-13.5%",
          width: '100%',
          maxWidth: 750,
          bgcolor: 'background.paper',
          position: 'fixed',
          marginLeft: '1',
          overflow: 'auto',
          maxHeight: 254,
        }}>
        {
          (coinsList !== undefined && coinsList.length !== 0)
            ?
            coinsList.map((data: any, key: number) => {
              return <ListItem key={key} onClick={(e) => handleOnClick(e, data.id)}><ListItemAvatar>
                <Avatar>
                  <img src={data.thumb} alt={data.id} width="30" height="30" />
                </Avatar>
              </ListItemAvatar><ListItemText
                  primary={data.name} />
              </ListItem>
            })
            :
            < ListItem ><ListItemAvatar>
            </ListItemAvatar><ListItemText
                primary={error} />
            </ListItem>
        }
      </List>

      <Card sx={{
        maxWidth: 345,
        marginTop: "25%",
        width: '100%',
        height: '100%',
        maxHeight: 250,
        position: 'fixed',
      }}>
        <CardActionArea>

          <img src={coinDetails.imageUrl} alt={coinDetails.name} width="100" height="100" style={{ marginTop: "20px" }} />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {coinDetails.name}
            </Typography>
            <Typography variant="h4" color="text.secondary">
              {coinDetails.price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div >


  );
}

export default App;
