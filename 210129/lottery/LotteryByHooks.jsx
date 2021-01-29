import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

// useMemo : 복잡한 함수의 결과값(return 값)을 기억
// useCallback : 복잡한 함수 그 자체를 기억
// useRef : 일반 값을 기억

// 함수형 컴포넌트의 경우, class형과 달리 const 함수명 = () => {} 에서 {} 안에 있는 내용이
// 렌더링 될 때마다 전부 새로 실행이 되기 때문에 {} 내용이 많고 복잡할 수록 실행되는 데에 걸리는
// 시간/비용이 증가
// 따라서 useMemo와 useCallback 을 사용해서 복잡한 함수를 저장해두면 그 시간/비용을 줄일 수 있음

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

const LotteryByHooks = () => {
    // Tips 1. hooks는 선언 시 순서가 바뀌면 안되므로 조건문 안에 넣으면 안된다.
    // ex) if(조건) { const [ test, setTest ] = useState(''); }  >>> NO!!!
    // Tips 2. hooks들끼리 내부에 hooks를 선언하는 것도 안됨
    // ex) useEffect(() => { useState().... })  >>> NO!!!
    // > 실행순서가 항상 같게끔 만들어야 실행에 문제가 없음

    const [winBalls, setWinBalls] = useState([]);
    const lottoNumbers = useMemo(() => getWinNumbers(), [winBalls]);
    // 두번째인자 [] 가 바뀌지 않는 한, 첫번째요소는 다시 실행되지 않음 
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);;
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);

    const timeouts = useRef([]);

    useEffect(() => {
        //ajax
    }, []); // componentDidMount만 실행

    const mounted = useRef(false);
    useEffect(() => {
        if(!mounted.current) {
            mounted.current = true;
        } else {
            // ajax
        }
    }, [바뀌는값]); // componentDidUpdate만 실행, componentDidMount X

    useEffect(() => {
        console.log('useEffect');
        for (let i = 0; i < winNumbers.length - 1; i++) {
            // 비동기 함수에서 let을 사용하면 클로저 문제 방지 가능
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevWinBalls) => [...prevWinBalls, winNumbers[i]]);
            }, (i + 1) * 1000);
        }
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);
        return () => {
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            });
        };
    }, [timeouts.current]); // 빈 배열이면 componentDidMount와 동일
    // 배열에 요소가 있으면 componentDidMount와 componentDidUpdate 둘 다 수행

    useEffect(() => {
        console.log('로또 숫자를 생성합니다.');
    }, [winNumbers]);

    const onClickRedo = useCallback(() => {
        console.log('onClickRedo');
        console.log(winNumbers);
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = []; // timeouts.current가 직접 변경되는 지점
        // 위에 선언된 timeouts.current[i] = setTimeout(~~) 은 current가 아니라 내부 배열의
        // 요소가 변경되는 것이므로 useEffect 의 두번째 요소인 [] 안에 timeouts.current가 
        // 변하는 기준이 바로 여기가 되는 것
    }, [winNumbers]);

    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus} onClick={onClickRedo} />}
            {/* 자식 컴포넌트에 함수를 전달할 때는 꼭 useCallback으로 감싸야 함
            why? 함수형 컴포넌트는 렌더링 때마다 전체 내용을 실행시키는데, 그 때마다 함수가 재선언되는
            것과 동일하고, 자식 컴포넌트는 새로운 함수를 계속 받으니까 렌더링을 또 하게 됨 */}
            {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </>
    );
};

export default LotteryByHooks;