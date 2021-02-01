import React from 'react';
import Tr from './Tr';

const Table = ({ onClick, tableData, dispatch }) => {
    return (
        <table className="table" dispatch={dispatch}>
            {Array(tableData.length).fill().map((tr, i) => 
                <Tr key={"tr" + i} rowIndex={i} rowData={tableData[i]} />)}
        </table>
    );
}

export default Table;