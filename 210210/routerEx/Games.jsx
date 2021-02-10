import React from 'react';
import { BrowserRouter, HashRouter, Route, Link } from 'react-router-dom';
import NumberBaseball from '../../210127/numberBaseball/NumberBaseball'; 
// function 컴포넌트로 만든 경우 Games.jsx의 import된 React와 
// import된 컴포넌트 안의 React가 충돌하여 오류 발생
// class형태로 바꿔주자
import WordChain from '../../210127/wordChain/WordChain';
import RSP from '../../210128/rockScissorsPaper/RockScissorsPaperByHooks';
import lottery from '../../210129/lottery/LotteryByHooks';
import tictactoe from '../../210201/tictacto/TicTacToe';
import minesweeper from '../../210208/minesweeper/Minesweeper';

const Games = () => {
    return (
        <BrowserRouter>
            <Link to="/numberBaseball">숫자야구</Link>&nbsp;
            <Link to="/wordChain">끝말잇기</Link>&nbsp;
            <Link to="/rockScissorsPaper">가위바위보</Link>&nbsp;
            <Link to="/lottery">로또생성기</Link>&nbsp;
            <Link to="/tictactoe">오목</Link>&nbsp;
            <Link to="/minesweeper">지뢰찾기</Link>
            <div>
                <Route path="/numberBaseball" component={NumberBaseball}/>
                <Route path="/wordChain" component={WordChain} />
                <Route path="/rockScissorsPaper" component={RSP}/>
                <Route path="/lottery" component={lottery}/>
                <Route path="/tictactoe" component={tictactoe}/>
                <Route path="/minesweeper" component={minesweeper}/>
            </div>
        </BrowserRouter>
    );
}

export default Games;