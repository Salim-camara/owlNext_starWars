import axios from 'axios';
import React, { useEffect, useState } from 'react';
import starWars from './img/starWars.png';

function App() {

  const [data, setData] = useState([]);

  // fetching data
  useEffect(() => {
    let tempoData = []
    axios.get('https://swapi.dev/api/people/')
      .then((resPeople) => {
        tempoData.push(...resPeople.data.results);
        axios.get('https://swapi.dev/api/planets/')
          .then((resPlanets) => {
            tempoData.push(...resPlanets.data.results);
          })
          .catch((err) => console.log('error fetch data planets: ' + err))
      })
      .then(() => {
        setData(tempoData);
      })
      .catch((err) => console.log('error fetch data people: ' + err))
  }, []);


  return (
    <div className="App">
      <div className="App_search">
        <div className="App_search_logos">
          <h1 className="App_search_logos--owl">OwlNext</h1>
          <img src={starWars} className="App_search_logos--sw" />
        </div>
        <div className="App_search_searchBarButton">
          <form className="App_search_searchBarButton--form">
            <input placeholder='Planète ou personnage' className="App_search_searchBarButton--input" />
            <button type='submit' className="App_search_searchBarButton--button" onClick={(e) => {
              e.preventDefault();
              console.log(data)
            }}>
              Rechercher
            </button>
          </form>
        </div>
      </div>
      <div className="App_results">

      </div>
      <div>

      </div>
    </div>
  );
}

export default App;
