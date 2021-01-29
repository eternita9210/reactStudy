import React, { Component } from 'react';

// 클래스의 경우, 
// constructor > render > ref > componentDidMount (화면 보임)
// setState/props 바뀔 때  shouldComponentUpdate(true) > render > componentDidUpdate
// 부모가 나를 없앴을 때 > componentWillUnmount > 소멸

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
}

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
}

const computerChoice = (imgCoord) => {
    // find( ) 메서드는 주어진 판별 함수를 만족하는 첫 번째 요소의 값을 반환
    // 그런 요소가 없다면 undefined를 반환
    return Object.entries(rspCoords).find(function (v) {
        return v[1] === imgCoord;
    })[0];
}

class RSP extends Component {
    state = {
        result: '',
        score: 0,
        imgCoord: '0'
    };

    interval;

    componentDidMount() {
        // render 가 성공적으로 최초 1회 실행되었다면 실행되는 함수
        // 비동기 요청이 많이 일어나는 곳
        // 비동기 함수 밖에 있는 변수값을 사용하면 함수 안에서는 변동되지 않음 (클로저 발생)
        // const { imgCoord } = this.state;

        this.interval = setInterval(this.changeHand, 100);
    }

    // shouldComponentUpdate() {
    //     return true;
    // }

    componentDidUpdate() {
        // 리렌더링 (setState 든 props가 바뀌는 해서 새로 렌더링할 때) 후에 실행
    }

    componentWillUnmount() {
        // 컴포넌트가 제거되기 직전 실행되는 함수
        // componentDidMount에서 실행한 내용을 삭제
        // componentDidMount에서 받은 비동기 요청 정리가 일어남
        // 정리하지 않으면 해당 비동기 요청이 계속 발생해서 메모리를 먹음 > 메모리 누수!
        clearInterval(this.interval);
    }

    changeHand = () => {
        const { imgCoord } = this.state;
        if (imgCoord === rspCoords.바위) {
            this.setState({
                imgCoord: rspCoords.가위,
            });
        } else if (imgCoord === rspCoords.가위) {
            this.setState({
                imgCoord: rspCoords.보,
            });
        } else if (imgCoord === rspCoords.보) {
            this.setState({
                imgCoord: rspCoords.바위,
            });
        }
    }

    onClickBtn = (choice) => {
        // onClickBtn = (choice) => () => {} 형태를 쓰면
        // render 쪽 return 의 함수 표현을
        // onClick={() => this.onClickBtn('바위')} 가 아니라
        // onClick={this.onClickBtn('바위')} 로 쓸 수 있음 >> 고차함수 패턴
        const { imgCoord } = this.state;
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            this.setState({
                result: '비겼습니다.',
            });
        } else if ([-1, 2].includes(diff)) {
            this.setState((prevState) => {
                return {
                    result: '이겼습니다!',
                    score: prevState.score + 1,
                }
            });
        } else {
            this.setState((prevState) => {
                return {
                    result: '졌습니다..',
                    score: prevState.score - 1,
                }
            })
        }
        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100)
        }, 2000);
    }

    render() {
        const { result, score, imgCoord } = this.state;
        return (
            <>
                <div id="computer"
                    style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
                <div>
                    <button id="rock" className="btn" onClick={() => this.onClickBtn('바위')}>바위</button>
                    <button id="scissors" className="btn" onClick={() => this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={() => this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;