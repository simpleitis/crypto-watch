import { connect } from 'react-redux';
import React from 'react'

function Exchange(props) {
  return (
    <div className="sm:col-span-1 md:col-span-6 lg:col-span-5 lg:h-max lg:row-span-1 xl:col-span-7 2xl:col-span-5 h-full w-full bg-white shadow-md">
      <p>Exchange Coins</p>
      <div className="flex flex-wrap">
        <p>Sell</p>
        <ul className=" space-y-3 text-sm h-40 overflow-y-auto scrollbar">
          {props.cryptoInfo.map((coin) => {
            return (
              <div className="hover:bg-red-50 p-3 scroll-auto" key={coin.name}>
                <li>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-white rounded"
                      value={coin.name}
                      id={coin.id}
                      // onClick={handleSelection}
                    />
                    <label className="ml-2 text-sm font-medium text-gray-500">
                      {coin.name}
                    </label>
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cryptoInfo: state.crypto.cryptoInfo,
  };
};

export default connect(mapStateToProps, null)(Exchange);
