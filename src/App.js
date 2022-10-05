import SelectorDropDown from './components/CurrencyDropDown';
import { Provider } from 'react-redux';
import store from './redux/store';
import SearchBar from './components/SearchBar';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Chart from './components/Chart';
import PieChart from './components/PieChart';
import Exchange from './components/Exchange';

function App() {
  return (
    <Provider store={store}>
      <Header />
      <div className="App p-5 grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 lg:grid-row-12 xl:grid-cols-10 2xl:grid-cols-12 2xl:px-10 2xl:py-10 2xl:mx-32 2xl:my-10 gap-4 bg-slate-100">
        <SelectorDropDown />
        <SearchBar />
        <Sidebar />
        <Chart />
        <PieChart />
        <Exchange />
      </div>
    </Provider>
  );
}

export default App;
