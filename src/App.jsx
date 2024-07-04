import React from 'react';
import CryptoTable from './components/CryptoTable';
import './App.css';

const App = () => {
    return (
        <div className="App">
            <h1>Top 25 Crypto Currencies</h1>
            <CryptoTable />
        </div>
    );
};

export default App;


