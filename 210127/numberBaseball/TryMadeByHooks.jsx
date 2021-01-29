import React, { memo } from 'react';

const TryMadeByHooks = memo(({ tryInfo }) => {
    // 구조분해 할당

    // 리액트 원칙 2.
    // 부모로부터 받은 props는 절대 직접 값을 변경하면 안됨
    // 만약 바꿔야 한다면 state로 받아서 변경할 것!
    // const [result, setResult] = useState(tryInfo.result);
    // const onClick = () => {
    //     setResult('1');
    // };
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    );
})

export default TryMadeByHooks;