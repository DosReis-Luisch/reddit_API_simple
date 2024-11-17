import './App.css';
import Cards from './components/Cards';
import Search from './components/Search';
import Header from './components/Header';
import Categories from './components/Categories';

function App() {
  return (
    <div className="App">
      <Header />
      <Categories />
      <Search />
      <Cards />
    </div>
  );
}

export default App;
