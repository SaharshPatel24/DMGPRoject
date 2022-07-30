import React, { useState } from 'react';
import './App.css';

function App() {
  const [Query, setQuery] = useState('');
  return (
    <div className="App">
      <form className="form-search" method="get" action="#">
        <input type="search" name="search" onChange={event => setQuery(event.target.value)} placeholder="search your crypto here ...." />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default App;
