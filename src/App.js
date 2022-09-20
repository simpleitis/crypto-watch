import SelectorDropDown from './components/SelectorDropDown';
import { Provider } from 'react-redux';
import store from './redux/store';
import SearchBar from './components/SearchBar';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Graph from './components/Graph';

function App() {
  return (
    <Provider store={store}>
      <Header />
      <div className="App grid grid-cols-12 grid-rows-12 gap-y-5 m-0 md:m-16 bg-slate-100 p-5 md:p-16">
        <SelectorDropDown />
        <SearchBar />
        <Sidebar />
        <Graph />
        
      </div>
    </Provider>
  );
}

export default App;
