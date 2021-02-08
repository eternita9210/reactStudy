import React from 'react';
import Tr from './Tr';

const Table = ({ tableData, dispatch }) => {
    return (
        <table className="table">
            <tbody>
                {Array(tableData.length).fill().map((tr, i) =>
                    <Tr key={"tr" + i} rowIndex={i} rowData={tableData[i]} dispatch={dispatch} />)}
            </tbody>
        </table>
    );
};

export default Table;