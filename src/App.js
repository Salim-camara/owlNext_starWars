import axios from 'axios';
import React, { useEffect, useState } from 'react';
import starWars from './img/starWars.png';


function App() {
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState(null);

  // fetching data
  useEffect(() => {
    let tempoData = [];
    axios.get('https://swapi.dev/api/people/')
      .then((resPeople) => {
        tempoData.push(...resPeople.data.results);
        axios.get('https://swapi.dev/api/planets/')
          .then((resPlanets) => {
            tempoData.push(...resPlanets.data.results);
            setData(tempoData);
          })
          .catch((err) => console.log('error fetch data planets: ' + err))
      })
      .then(() => {
        setData(tempoData);
        console.log(data)
      })
      .catch((err) => console.log('error fetch data people: ' + err))
  }, []);

  // list generator
  const listGenerator = () => {
    const filtredData = data.filter((element) => element.name.toLowerCase().includes(inputValue.toLowerCase()));
    for (const element of filtredData) {
      const elementContainer = document.createElement('div');
      const elementContainerRight = document.createElement('div');
      const elementContainerLeft = document.createElement('div');
      elementContainer.classList.add('elementContainer');
      elementContainerRight.classList.add('elementContainer_right');
      elementContainerLeft.classList.add('elementContainer_left');
      elementContainerRight.innerHTML = 'Afficher détails';
      if (element.climate) {
        elementContainerLeft.innerHTML = `Planète  =>  <strong>${element.name}</strong>`;
      } else {
        elementContainerLeft.innerHTML = `Personnage  =>  <strong>${element.name}</strong>`;
      }
      elementContainer.appendChild(elementContainerLeft);
      elementContainer.appendChild(elementContainerRight);
      document.querySelector('.App_results').appendChild(elementContainer);
    }
  }

  const handleList = (e) => {
    e.preventDefault();
    document.querySelector('.App_results').innerHTML = '';
    listGenerator();
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
            <input placeholder='Planète ou personnage' className="App_search_searchBarButton--input" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button type='submit' className="App_search_searchBarButton--button" onClick={(e) => {handleList(e)}}>
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
