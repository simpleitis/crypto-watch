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
      <div className="App p-5 grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 lg:grid-row-12 gap-4 bg-slate-100">
        <SelectorDropDown />
        <SearchBar />
        <Sidebar />
        <Graph />
      </div>
    </Provider>
  );
}

export default App;
