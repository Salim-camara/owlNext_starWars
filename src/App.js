import axios from 'axios';
import React, { useEffect, useState } from 'react';
import starWars from './img/starWars.png';
import ListFactory from './listFactory';

function App() {

  const [inputValue, setInputValue] = useState('');
  let test = 1;
  const handleValid = (e) => {
    e.preventDefault();
    test = 2;
  }


  return (
    <div className="App">
      <div className="App_search">
        <div className="App_search_logos">
          <h1 className="App_search_logos--owl">OwlNext</h1>
          <img src={starWars} className="App_search_logos--sw" />
        </div>
        <div className="App_search_searchBarButton">
          <form className="App_search_searchBarButton--form">
            <input placeholder='Planète ou personnage' className="App_search_searchBarButton--input" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
            <button type='submit' className="App_search_searchBarButton--button" onClick={(e) => handleValid(e)}>
              Rechercher
            </button>
          </form>
        </div>
      </div>
      <div className="App_results">
            <ListFactory word={test}/>
      </div>
      <div>

      </div>
    </div>
  );
}

export default App;
