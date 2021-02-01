import React from 'react';
import Td from './Td';

const Tr = ({ rowData, rowIndex, dispatch }) => {
    return (
        <tr className="table" dispatch={dispatch}>
            {Array(rowData.length).fill().map((td, i) => 
                <Td key={"td" + i} rowIndex={rowIndex} cellIndex={i}/>)}
        </tr>
    );
}

export default Tr;