// hooks로 전환
import React, { useState, useRef } from 'react';

const SpeedCheckByHooks = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요.');
    const [result, setResult] = useState([]);

    // 값이 바뀌지만 그 때문에 화면에 영향을 주고싶지는 않을 때 useRef 사용
    // timeOut이나 interval를 useRef로 많이 사용
    // ref는 접근 시 꼭 .current 사용!
    const timeOut = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = () => {
        if (state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요.');
            timeOut.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭하세요.');
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000);
        } else if (state === 'ready') {
            clearTimeout(timeOut.current);
            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 이후에 클릭하세요.');
        } else if (state === 'now') {
            endTime.current = new Date(); 
            setState('waiting');
            setMessage('클릭해서 시작하세요.');
            setResult((prevResult) => {
                console.log(prevResult);
                return [...prevResult, endTime.current - startTime.current];
            });
        }
    };

    const renderAverage = () => {
        return result.length === 0
            ? null
            : <>
                <div>평균 시간: {result.reduce((a, c) => a + c) / result.length} ms</div>
                <button onClick={onReset}>취소</button>
            </>
    };

    const onReset = () => {
        setResult([]);
    };

    return (
            <>
                <div id="screen" className={state} onClick={onClickScreen}>
                    {message}
                </div>
                {(() => {
                    if(result.length === 0) {
                        return null;
                    } else {
                        return <>
                        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length} ms</div>
                        <button onClick={onReset}>취소</button>
                    </>
                    }
                    // 함수 안에서는 if문과 for문을 쓸 수 있으므로 함수 안에 선언해서 사용
                    // 하지만 그것보다는 return이나 render 위에 따로 선언해서 불러오는 게 깔끔
                    // 제일 좋은 건 자식 컴포넌트로 따로 빼서 불러오는 것
                })()}
                {renderAverage()}
            </>
    );
}

export default SpeedCheckByHooks;