import React, { useCallback, useReducer, useEffect } from 'react';
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
    recentCell: [-1, -1], // 없는 칸
}

// 모듈화 (action의 이름, type)
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

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
            const tableData = [...state.tableData]; // 얕은 복사
            tableData[action.row] = [...tableData[action.row]]; // immer 라는 라이브러리로 가독성 문제 해결
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData, // 불변성 유지
                recentCell: [action.row, action.cell],
            };
        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            }
        };
        case RESET_GAME: {
            return {
                ...state,
                turn: 'O',
                tableData: [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', '']],
                recentCell: [-1, -1],
            };
        };
        default:
            return state;
    }
}

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, turn, winner, recentCell } = state;

    const onClickTable = useCallback(() => {
        dispatch({ type: SET_WINNER, winner: 'O' }); // dispatch의 action 객체 설정
        // action을 해석해서 실행(dispatch)해주는 것 > reducer
    }, []);

    useEffect(() => {
        const [row, cell] = recentCell;
        if (row < 0) {
            return;
        }
        let win = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true;
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true;
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true;
        }
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
            win = true;
        }
        if (win) { //승리시
            dispatch({ type: SET_WINNER, winner: turn });
            dispatch({ type: RESET_GAME });
        } else { //무승부
            let all = true; // 칸이 다 차 있다면 무승부
            tableData.forEach(row => { // 무승부 검사
                row.forEach((cell) => {
                    if (!cell) {
                        all = false;
                    }
                })
            });
            if (all) {
                // 무승부라면
                dispatch({ type: RESET_GAME });
            } else {
                dispatch({ type: CHANGE_TURN });
            }
        }
    }, [recentCell]); // state는 비동기이므로 useEffect를 써야함

    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('O');
    // const [tableData, setTableData] = useState([['','',''],['','',''],['','','']]);
    return (
        <>
            <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
            {winner && <div>{winner}님의 승리</div>}
        </>
    );
}

export default TicTacToe;