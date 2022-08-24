import axios from 'axios';
import React, { useEffect, useState } from 'react';
import starWars from './img/starWars.png';


function App() {
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState(null);
  const [modalId, setModalId] = useState(null);
  const [isModalLaunched, setIsModalLaunched] = useState(false);

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
    if(filtredData.length == 0) {
      document.querySelector('.App_results').innerHTML = 'Aucun résultat trouvé';
    } else {
      for (const element of filtredData) {
        const elementContainer = document.createElement('div');
        const elementContainerRight = document.createElement('div');
        const elementContainerLeft = document.createElement('div');
        elementContainer.classList.add('elementContainer');
        elementContainerRight.classList.add('elementContainer_right');
        elementContainerLeft.classList.add('elementContainer_left');
        elementContainerRight.innerHTML = 'Afficher détails';
        elementContainerRight.addEventListener('click', () => {
          const modal = document.querySelector('.modal');
          modal.innerHTML = '';
          setIsModalLaunched(true);
          setModalId(element.url);
          modal.classList.remove('modalHide');
        });
        if (element.climate) {
          elementContainerLeft.innerHTML = `Planète  =>  <strong>${element.name}</strong>`;
        } else {
          elementContainerLeft.innerHTML = `Personnage  =>  <strong>${element.name}</strong>`;
        }
        elementContainer.appendChild(elementContainerLeft);
        elementContainer.appendChild(elementContainerRight);
        document.querySelector('.App_results').appendChild(elementContainer);
        console.log(data);
        
      }
    }
  }

  const handleList = (e) => {
    e.preventDefault();
    document.querySelector('.App_results').innerHTML = '';
    listGenerator();
  }

  // modal
  useEffect(() => {
    if(isModalLaunched) {
      const findTarget = data.find((element) => element.url == modalId);
      const modal = document.querySelector('.modal');
      const modalTitle = document.createElement('div');
      const modalDetailContainer = document.createElement('div');
      const modalDetail1 = document.createElement('p');
      const modalDetail2 = document.createElement('p');
      const modalDetail3 = document.createElement('p');
      const modalDetail4 = document.createElement('p');
      const modalCross = document.createElement('div');
      modalTitle.classList.add('modal_title');
      modalDetailContainer.classList.add('modal_detail');
      modalCross.classList.add('modal_cross');
      modal.appendChild(modalTitle);
      modal.appendChild(modalDetailContainer);
      modal.appendChild(modalCross);
      modalDetailContainer.appendChild(modalDetail1);
      modalDetailContainer.appendChild(modalDetail2);
      modalDetailContainer.appendChild(modalDetail3);
      modalDetailContainer.appendChild(modalDetail4);
      modalCross.innerHTML = 'X';
      modalCross.addEventListener('click', () => {
        modal.classList.add('modalHide');
      })
      modalTitle.innerHTML = findTarget.name;

      if(modalId.includes('people')) {
        modalDetail1.innerHTML = `Année de naissance / création: ${findTarget.birth_year}`;
        modalDetail2.innerHTML = `Poids: ${findTarget.mass}`;
        modalDetail3.innerHTML = `Taille: ${findTarget.height}`;
        modalDetail4.innerHTML = `Couleur de peau / peinture: ${findTarget.skin_color}`;
      } else {
        modalDetail1.innerHTML = `Climat: ${findTarget.climate}`;
        modalDetail2.innerHTML = `Population: ${findTarget.population}`;
        modalDetail3.innerHTML = `Période de rotation: ${findTarget.rotation_period}`;
        modalDetail4.innerHTML = `Gravité: ${findTarget.gravity}`;
      }
    }
  }, [modalId]);


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
      <div className='modal modalHide'>
      </div>
    </div>
  );
}

export default App;
