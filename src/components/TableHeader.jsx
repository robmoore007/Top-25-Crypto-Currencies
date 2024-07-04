import React from 'react';

const TableHeader = ({ title, onClick }) => {
    return (
        <th onClick={onClick}>
            {title}
        </th>
    );
};

export default TableHeader;
    