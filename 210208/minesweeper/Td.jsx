import React, { useCallback, useContext, memo, useMemo } from 'react';
import { CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL, TableContext } from './Minesweeper';

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#444',
            };
        case CODE.CLICK_MINE:
        case CODE.OPENED:
            return {
                background: 'white',
            };
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return {
                background: 'yellow',
            };
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return {
                background: 'red'
            };
        default:
            return {
                background: 'white'
            };
    }
};

const getTdText = (code) => {
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.CLICKED_MINE:
            return '펑';
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return '!';
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return '?';
        default:
            return code || '';
    }
};

const Td = memo(({ rowIndex, cellIndex }) => {
    const { tableData, dispatch, halted } = useContext(TableContext);
    const onClickTd = useCallback(() => {
        if (halted) {
            return;
        }
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.OPENED:
            case CODE.FLAG:
            case CODE.FLAG_MINE:
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                return;
            case CODE.NORMAL:
                dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.MINE:
                dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
                return;
        };
    }, [tableData[rowIndex][cellIndex], halted]);
    const onRightClickTd = useCallback((e) => {
        if (halted) {
            return;
        }
        e.preventDefault(); // 마우스 우클릭 시 기본으로 나오는 설정메뉴 off
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);
    // return useMemo(() => ( // Context API를 사용하면 실제 렌더링이 안되더라도 한 번씩은 화면 깜빡임
    //     // 따라서 캐싱을 위해 useMemo 사용
    //     <td style={getTdStyle(tableData[rowIndex][cellIndex])}
    //         onClick={onClickTd}
    //         onContextMenu={onRightClickTd}>
    //         {getTdText(tableData[rowIndex][cellIndex])}
    //     </td>
    // ), [tableData[rowIndex][cellIndex]]);


    return <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex]}/>
});

// useMemo를 쓰기 싫다면 컴포넌트를 분리해서 사용 가능
const RealTd = memo(({ onClickTd, onRightClickTd, data }) => {
    return ( // Context API를 사용하면 실제 렌더링이 안되더라도 한 번씩은 화면 깜빡임
        // 따라서 캐싱을 위해 useMemo 사용
        <td style={getTdStyle(data)}
            onClick={onClickTd}
            onContextMenu={onRightClickTd}>
            {getTdText(data)}
        </td>
    );
});

export default Td;