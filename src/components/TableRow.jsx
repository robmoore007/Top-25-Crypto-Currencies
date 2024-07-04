import React from 'react';

const TableRow = ({ crypto, rates }) => {
    const priceUsd = parseFloat(crypto.priceUsd);
    const priceGbp = (priceUsd * rates.GBP).toFixed(2);
    const priceEur = (priceUsd * rates.EUR).toFixed(2);
    const priceAed = (priceUsd * rates.AED).toFixed(2);

    return (
        <tr>
            <td>{crypto.id}</td>
            <td>{crypto.rank}</td>
            <td>{crypto.symbol}</td>
            <td><a href={`https://coincap.io/assets/${crypto.id}`} target="_blank" rel="noopener noreferrer">Link</a></td>
            <td>{priceUsd.toFixed(2)}</td>
            <td>{priceGbp}</td>
            <td>{priceEur}</td>
            <td>{priceAed}</td>
        </tr>
    );
};

export default TableRow;
