import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

const CryptoTable = () => {
    const [cryptos, setCryptos] = useState([]);
    const [currencyRates, setCurrencyRates] = useState({});
    const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'ascending' });

    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                const [cryptoResponse, currencyResponse] = await Promise.all([
                    axios.get('https://api.coincap.io/v2/assets'),
                    axios.get('https://open.er-api.com/v6/latest/USD')
                ]);
                setCryptos(cryptoResponse.data.data.slice(0, 25));
                setCurrencyRates(currencyResponse.data.rates);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCryptoData();
    }, []);

    const sortedCryptos = [...cryptos].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <table>
            <thead>
                <tr>
                    <TableHeader title="ID" onClick={() => requestSort('id')} />
                    <TableHeader title="Rank" onClick={() => requestSort('rank')} />
                    <TableHeader title="Symbol" onClick={() => requestSort('symbol')} />
                    <th>Link</th>
                    <TableHeader title="Price (USD)" onClick={() => requestSort('priceUsd')} />
                    <TableHeader title="Price (GBP)" />
                    <TableHeader title="Price (EUR)" />
                    <TableHeader title="Price (AED)" />
                </tr>
            </thead>
            <tbody>
                {sortedCryptos.map(crypto => (
                    <TableRow key={crypto.id} crypto={crypto} rates={currencyRates} />
                ))}
            </tbody>
        </table>
    );
};

export default CryptoTable;
