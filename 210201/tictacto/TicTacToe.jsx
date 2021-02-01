import React, { useCallback, useReducer, useState } from 'react';
import Table from './Table';

// Reducer와 dispatch
// 기존 state (initialState) 는 이벤트들이 직접 수정할 수 없음
// 이 때 수정하고자 하는 action을 dispatch(실행) 해야 함
// action을 어떻게 처리할 것인지에 대해서는 reducer에서 정의
// action의 이름은 대문자로 선언하며, 밖에 선언해두면 사용하기 편함

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']],
}

// 모듈화
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';

const reducer = (state, action) => {
    // action을 해석해서 실행(dispatch)해주는 것 > reducer
    switch (action.type) {
        case SET_WINNER:
            // state.winner = action.winner > 이런 식으로 직접 바꾸면 안됨
            return { // state를 어떻게 바꿀지에 대한 선언 부분
                ...state, // 얕은 복사로 불변성 유지
                winner: action.winner,
            };
        case CLICK_CELL:
            const tableData = { ...state.tableData }; // 얕은 복사
            tableData[action.row] = [...tableData[action.row]]; // immer 라는 라이브러리로 가독성 문제 해결
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData, // 불변성 유지
            };
        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            }
        }
    }
}

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const onClickTable = useCallback(() => {
        dispatch({ type: SET_WINNER, winner: 'O' }); // dispatch의 action 객체 설정
        // action을 해석해서 실행(dispatch)해주는 것 > reducer
    }, []);

    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('O');
    // const [tableData, setTableData] = useState([['','',''],['','',''],['','','']]);
    return (
        <>
            <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch}/>
            {state.winner && <div>{state.winner}님의 승리</div>}
        </>
    );
}

export default TicTacToe;