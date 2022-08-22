import starWars from './img/starWars.png';

function App() {
  return (
    <div className="App">
      <div className="App_search">
        <div className="App_search_logos">
          <h1 className="App_search_logos--owl">OwlNext</h1>
          <img src={starWars} className="App_search_logos--sw"/>
        </div>
        <div className="App_search_searchBarButton">
          <form className="App_search_searchBarButton--form">
            <input placeholder='Planète ou personnage' className="App_search_searchBarButton--input"/>
            <button type='submit' className="App_search_searchBarButton--button">Rechercher</button>
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
