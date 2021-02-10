import React, { useReducer, createContext, useMemo, useEffect } from 'react';
import Table from './Table';
import Form from './Form';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0, // 0 이상이면 다 opened
}

// Context API
// 생성한 다음 자식 컴포넌트에 Provider로 감싸줘야 함
export const TableContext = createContext({
    tableData: [
        [], [], [], [], [],
    ],
    halted: true,
    dispatch: () => { },
});

const initialState = {
    tableData: [],
    data: {
        row: 0,
        cell: 0,
        mine: 0,
    },
    timer: 0,
    result: '',
    halted: true, // 게임 중단 여부
    openedCount: 0,
}

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });
    const shuffle = [];
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        // array.splice(index, origin, replace)
        // index에 해당하는 부분에 origin 대신 replace를 넣는다
        // origin 자리에 0이 있다면 기존 해당 인덱스 부분 이상의 인덱스들은 +1 되며 뒤로 밀림
        shuffle.push(chosen);
    }
    console.log(shuffle);
    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }
    // 지뢰심기
    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }
    console.log(data);
    return data;
}

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                data: {
                    row: action.row,
                    cell: action.cell,
                    mine: action.mine,
                },
                tableData: plantMine(action.row, action.cell, action.mine),
                openedCount: 0,
                halted: false,
                timer: 0,
            };
        case OPEN_CELL: {
            // 불변성 유지 
            const tableData = [...state.tableData];
            // tableData[action.row] = [...state.tableData[action.row]]; > 재귀 시 불변성 유지
            // 를 위해 아래처럼 아예 전체를 새로 넣기
            tableData.forEach((row, i) => {
                tableData[i] = [...state.tableData[i]];
            });
            // tableData[action.row][action.cell] = CODE.OPENED;
            const checked = [];
            let openedCount = 0;
            const checkArround = (row, cell) => {
                if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) {
                    // 상하좌우칸이 아닐 경우 필터링
                    return;
                }
                if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])) {
                    // 닫힌 칸만 열기
                    return;
                }
                if (checked.includes(row + ',' + cell)) {
                    // 이미 검사한 칸이면 return
                    return;
                } else {
                    checked.push(row + ',' + cell);
                }
                // 클릭 시, 주변 칸의 지뢰여부 확인
                let arround = [];
                if (tableData[row - 1]) { // 첫번째 줄의 칸을 선택할 때
                    arround = arround.concat(
                        tableData[row - 1][cell - 1],
                        tableData[row - 1][cell],
                        tableData[row - 1][cell + 1],
                    )
                }
                arround = arround.concat( // 선택한 칸의 양 옆칸
                    tableData[row][cell - 1],
                    tableData[row][cell + 1]
                );
                if (tableData[row + 1]) { // 마지막 줄의 칸을 선택할 때
                    arround = arround.concat(
                        tableData[row + 1][cell - 1],
                        tableData[row + 1][cell],
                        tableData[row + 1][cell + 1],
                    )
                }
                const count = arround.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
                // 재귀를 이용한 빈 칸 한 번에 열기
                if (count === 0) {
                    const near = [];
                    if (row - 1 > -1) {
                        near.push([row - 1, cell - 1]);
                        near.push([row - 1, cell]);
                        near.push([row - 1, cell + 1]);
                    }
                    near.push([row, cell - 1]);
                    near.push([row, cell + 1]);
                    if (row + 1 < tableData.length) {
                        near.push([row + 1, cell - 1]);
                        near.push([row + 1, cell]);
                        near.push([row + 1, cell + 1]);
                    }
                    near.forEach((n) => {
                        if (tableData[n[0][n[1]]] !== CODE.OPENED) {
                            checkArround(n[0], n[1]);
                        }
                    });
                }
                // openedCount += 1; 무작정 올리면, 
                // 기존의 열린 칸까지 포함되어 칸이 다 열리지 않았음에도 승리했다고 뜸
                if(tableData[row][cell] === CODE.NORMAL) { // 열리지 않은 칸일 때만 카운트 증가
                    openedCount += 1;
                }
                tableData[row][cell] = count;
            }
            checkArround(action.row, action.cell);
            let halted = false;
            let result = '';
            if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {
                // 승리
                halted = true;
                result = `${state.timer}초만에 승리하셨습니다.`;
            }
            return {
                ...state,
                tableData,
                openedCount: state.openedCount + openedCount,
                halted,
                result,
            };
        }
        case CLICK_MINE: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return {
                ...state,
                tableData,
                halted: true,
            };
        }
        case FLAG_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.CLICKED_MINE) {
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return {
                ...state,
                tableData,
            };
        }
        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return {
                ...state,
                tableData,
            };
        }
        case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
                tableData[action.row][action.cell] = CODE.MINE;
            } else {
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData,
            };
        }
        case INCREMENT_TIMER: {
            return {
                ...state,
                timer: state.timer + 1,
            }
        }
        default:
            return state;
    }
}

const Minsweeper = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, halted, timer, result } = state;
    // Context API를 사용하게 되면, Provider로 묶인 컴포넌트들은 그 중 하나가
    // 렌더링 될 때 다 같이 새로 정의/렌더링 되므로 최적화가 어려움
    // 이 때, useMemo로 캐싱한 값을 넘기면 그 문제 해결 가능
    const value = useMemo(() => ({ tableData, halted, dispatch }));
    useEffect(() => {
        let timer;
        if (halted === false) {
            timer = setInterval(() => {
                dispatch({ type: INCREMENT_TIMER });
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        }
    }, [halted]);

    return (
        <TableContext.Provider value={value}>
            <Form />
            <div>{timer}</div>
            <Table />
            <div>{result}</div>
        </TableContext.Provider>
    );
}

export default Minsweeper;