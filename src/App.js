import './App.css';
import Cards from './components/Cards';
import Search from './components/Search';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Search />
      <Cards />
    </div>
  );
}

export default App;
