import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [coinsList, setCoinsList] = useState([]);
  const [Query, setQuery] = useState('');

  useEffect(() => {
    const fetchCoinsList = async () => {
      let response = await fetch(`http://localhost:5000/search?query=${Query}`);
      let coins = await response.json();
      console.log(coins);
      setCoinsList(coins);
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
          marginTop: "-5%",
          width: '100%',
          maxWidth: 700,
          bgcolor: 'background.paper',
          position: 'fixed',
          overflow: 'auto',
          maxHeight: 150,
          '& ul': { padding: 0 },
        }}>
        {
          coinsList.map((data: any, key: number) => {
            return <ListItem key={key}><ListItemAvatar>
              <Avatar>
                <img src={data.thumb} alt={data.id} width="30" height="30" />
              </Avatar>
            </ListItemAvatar><ListItemText
                primary={data.name} />
            </ListItem>
          })
        }
      </List>
    </div>


  );
}

export default App;
