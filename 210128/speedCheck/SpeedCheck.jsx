// react 안에서 조건문 쓰기
// 삼항연산자 (조건부 연산자) 또는 && 사용
import React, { Component } from 'react';

class SpeedCheck extends Component {
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요.',
        result: [],
    };

    // this.setState와 달리 변경되어도 render 되지 않음
    timeout;
    startTime;
    endTime;

    onClickScreen = () => {
        const { state, message, result } = this.state;
        if (state === 'waiting') { // 시작
            this.setState({
                state: 'ready',
                message: '초록색이 되면 클릭하세요.',
            });
            this.timeout = setTimeout(() => {
                this.setState({
                    state: 'now',
                    message: '지금 클릭하세요.',
                });
                this.startTime = new Date(); // 색이 변한 시점 체크
            }, Math.floor(Math.random() * 1000) + 2000);
        } else if (state === 'ready') { // 먼저 체크
            this.setState({
                state: 'waiting',
                message: '너무 성급하시군요! 초록색이 된 이후에 클릭하세요.',
            });
            // 기존 setTimeout 초기화 (다시 처음으로 돌아감)
            clearTimeout(this.timeout);
        } else if (state === 'now') { // 정상 반응 (속도 체크)
            this.endTime = new Date(); // 연두색일 때 클릭한 시점 체크
            this.setState((prevState) => {
                return {
                    state: 'waiting',
                    message: '클릭해서 시작하세요.',
                    result: [...prevState.result, this.endTime - this.startTime],
                }
            })
        }

    };

    onReset = () => {
        this.setState( {
            result: [],
        })
    }

    renderAverage = () => {
        const { result } = this.state;
        return result.length === 0
            ? null
            : <>
                <div>평균 시간: {result.reduce((a, c) => a + c) / result.length} ms</div>
                <button onClick={this.onReset}>취소</button>
            </>
    };

    render() {
        return (
            <>
                <div id="screen"
                    className={this.state.state}
                    onClick={this.onClickScreen}>
                    {this.state.message}
                </div>
                {/* {this.state.result.length === 0 
                    ? null 
                    : <div>평균 시간: {this.state.result.reduce((a, c) => a + c) / this.state.result.length} ms</div>
                } */}
                {this.renderAverage()}
            </>
        );
    }
}

export default SpeedCheck;