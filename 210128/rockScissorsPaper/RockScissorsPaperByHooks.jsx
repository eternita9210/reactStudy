import React, { useState, useRef, useEffect } from 'react';

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
    return Object.entries(rspCoords).find(function (v) {
        return v[1] === imgCoord;
    })[0];
}

const RSP = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const [score, setScore] = useState(0);
    
    const interval = useRef();

    useEffect(() => { // componentDidMount, componentDidUpdate 역할 (1 대 1 대응은 아님)
        interval.current = setInterval(changeHand, 100);
        return () => {
            // componentWillUnmount 역할         
            clearInterval(interval.current);   
        }
    }, [imgCoord]); // 두 번째 인수 배열에 넣은 값들이 바뀔 때, useEffect 실행
    // 유의할 점은, class 컴포넌트와 달리 hooks는 렌더링 될 때마다 전체 const 함수가 실행되므로
    // class의 componentDidMount, componentDidUpdate, componentWillUnmount와 동일하게 대치될 수 없다
    // 위 함수에 console.log를 해보면 imgCoord가 바뀔 대마다 전체 함수가 실행됨
    // state 마다 다른 effect를 주고 싶다면 useEffect 여러번 사용 가능
    // 단 배열에는 꼭 useEffet를 다시 실행할 값만 넣을 것

    // useLayoutEffect > 페이지의 리사이징 시, 화면 변화 전에 실행시킬 내용이 들어감
    // 사용법은 동일함

    const changeHand = () => {
        if (imgCoord === rspCoords.바위) {
            setImgCoord(rspCoords.가위);
        } else if (imgCoord === rspCoords.가위) {
            setImgCoord(rspCoords.보);
        } else if (imgCoord === rspCoords.보) {
            setImgCoord(rspCoords.바위);
        }
    }

    const onClickBtn = (choice) => () => {
        clearInterval(interval.current);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            setResult('비겼습니다.');
        } else if ([-1, 2].includes(diff)) {
            setResult('이겼습니다!');
            setScore((prevScore) => prevScore + 1);
        } else {
            setResult('졌습니다..');
            setScore((prevScore) => prevScore - 1);
        }
        setTimeout(() => {
            interval.current = setInterval(changeHand, 100)
        }, 2000);
    }

    return (
        <>
            <div id="computer"
                style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
                <button id="scissors" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    );
}

export default RSP;