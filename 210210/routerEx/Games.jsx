import React from 'react';
import { BrowserRouter, HashRouter, Route, Link, Switch } from 'react-router-dom';
// BrowserRouter 대신 HashRouter 를 쓰면 주소 중간에 #가 들어감
// 장점 > 새로 고침 해도 BrowserRouter와 달리 오류가 나지 않음
// 이유 > # 이후 주소는 서버가 아니라 브라우저에 남아 있어 인식되지 않음
// 단점 > 서버가 # 이후 주소를 모르기 때문에 검색엔진에 페이지 기록이 남지 않음
////import NumberBaseball from '../../210127/numberBaseball/NumberBaseball'; 
// function 컴포넌트로 만든 경우 Games.jsx의 import된 React와 
// import된 컴포넌트 안의 React가 충돌하여 오류 발생
// class형태로 바꿔주자
////import RSP from '../../210128/rockScissorsPaper/RockScissorsPaper';
////import lottery from '../../210129/lottery/Lottery';
import GameMatcher from './GameMatcher';

const Games = () => {
    // Link로 연결된 Route는 프론트 단에서만 링크가 여러개인 것처럼 보이는 것일 뿐
    // 실제로 페이지가 여러개인 것이 아니므로 BrowserRouter를 사용할 때 (서버 쪽에 세팅했다고 가정)
    // (이 세팅은 config 파일에 historyFallback 설정으로 야매 세팅 가능)
    // 만약 변경된 페이지에서 새로고침하면
    // Cannot GET /numberBaseball 이런 식으로 서버가 알아듣지 못한다

    // Route는 계속 늘어나는 경우 비효율적
    // Route의 path를 /경로1/:경로2 이런식으로 적고, 다른 Link에 경로 1을 모두 붙이면
    // Route를 하나로 줄일 수 있음 >> 동적 라우팅
    // 이 때 경로 2 앞의 : (콜론)은 경로 2가 params (파라미터)라는 의미
    return (
        <BrowserRouter>
            <div>
                이 부분은 공통 부분으로 아래 링크를 클릭해도 변경되지 않음<br/>
                <Link to="/game/numberBaseball?query=10&this=is&test=query">숫자야구</Link>&nbsp;
                <Link to="/game/rockScissorsPaper">가위바위보</Link>&nbsp;
                <Link to="/game/lottery">로또생성기</Link>&nbsp;
                <Link to="/game/index">게임 매쳐</Link>
            </div>
            <div>
                {/* <Route path="/numberBaseball" component={NumberBaseball}/>
                <Route path="/rockScissorsPaper" component={RSP}/>
                <Route path="/lottery" component={lottery}/> */}
                {/* <Route path="/game/:name" component={GameMatcher}/> */}
                {/* 위 형태가 가장 기본이고 만약 component에 props를 전달한다고 하면 아래 형태들도 있음
                <Route path="/game/:name" component={() => <GameMatcher props={props.history}/>}/>
                render로 하면 (props)로 부모의 props를 자식에게 전달 가능
                <Route path="/game/:name" render={(props) => <GameMatcher props={props.history}/>}/>
                <Route path="/game/:name" render={(props) => <GameMatcher {...props}/>}/> */}
                <Switch>
                    {/* Switch 를 쓰면, 감싸인 Route의 path 중 가장 먼저 동일하다고 판단되는 주소로 연결됨
                     그러나 이 때 path가 "/"인 경우를 골라내지 못함
                     이럴 때는 path 앞에 exact를 붙이면 정확하게 주소가 / 인 경우만 해당됨*/}
                    <Route exact path="/" render={(props) => <GameMatcher {...props} />}/>
                    <Route path="/game/:name" render={(props) => <GameMatcher {...props} />}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default Games;