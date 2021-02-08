import React, { useCallback, useEffect, useRef, memo } from 'react';
import { CLICK_CELL } from './TicTacToe';

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
    console.log('td rendered');
    const ref = useRef([]);
    useEffect(() => {
        // console.log(rowIndex === ref.current[0], cellIndex === ref.current[1],
        //     cellData === ref.current[3], dispatch === ref.current[2]);
        // 콘솔에 보면, cellData만 변경되지만 td 전체가 tr안에 있어 새로 렌더링 되어 최적화가 어려웠음
        // 이걸 memo로 감싸면 쉬워짐!
        ref.current = [rowIndex, cellIndex, dispatch, cellData];
    }, [rowIndex, cellIndex, dispatch, cellData]);
    const onClickTd = useCallback(() => {
        console.log(rowIndex, cellIndex);
        if (cellData) { // 한 번 선택한 칸은 선택 못하도록
            return;
        }
        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
        // dispatch({ type: CHANGE_TURN }); dispatch와 useEffect는 비동기라 동시에 진행되면서
        // turn이 넘어가게 되므로 이 부분을 TicTacToe의 무승부 검사 위치로 옮김
    }, [cellData]);

    return (
        <td className="td" onClick={onClickTd}>{cellData}</td>
    );
});

export default Td;