import React, { memo, useMemo } from 'react';
import Td from './Td';

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
    return (
        <tr className="table">
            {Array(rowData.length).fill().map((td, i) =>
                <Td key={"td" + i} rowIndex={rowIndex} cellIndex={i}
                    cellData={rowData[i]} dispatch={dispatch} />)}
        </tr>
    );
});

export default Tr;