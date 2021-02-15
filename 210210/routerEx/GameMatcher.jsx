import React, { Component } from 'react';
import NumberBaseball from '../../210127/numberBaseball/NumberBaseball';
import RSP from '../../210128/rockScissorsPaper/RockScissorsPaper';
import Lotterty from '../../210129/lottery/Lottery';

export default class GameMatcher extends Component {
    render() {
        // this.props를 찍어보면 Route에서 건네받은 객체를 알 수 있는데
        // history, location, match 값들이 있음
        // history > 페이지 이동 기록, go, goBack, goForward 등 함수 사용 가능
        // location > hash, pathname, search 등의 값이 있음 search 안에 queryString 존재
        // 실제로 가지고 오려면 URLSearchParams 라는 객체 선언 필요
        let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1));
        console.log(urlSearchParams.get('test'));
        // match > params 내부에 경로명이 있음
        // 만약 Route를 사용하지 않고 위 값들에 접근하고 싶다면
        // withRouter를 import하고 export default withRouter(class명)로 작성해서 써야함
        if (this.props.match.params.name === 'numberBaseball') {
            return <NumberBaseball />
        }  else if (this.props.match.params.name === 'rockScissorsPaper') {
            return <RSP />
        } else if (this.props.match.params.name === 'lottery') {
            return <Lotterty />
        }
        return (
            <>
                일치하는 게임이 없습니다
            </>
        );
    }
}