import logo from '../../assets/images/logo.svg';
import './App.scss';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Pokemaen</p>
                <a
                    className="App-link"
                    href="https://www.pokemon.com/us/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    More pokemons
                </a>
            </header>
        </div>
    );
}

export default App;
