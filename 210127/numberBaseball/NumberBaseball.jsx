// 반복문 map과 key
// (배열, 객체배열).map((v) => {return});
// return 에 들어가는 반복 태그에는 key가 필수적 (중복되지 않아야 함)

import React, { Component, createRef } from 'react';
import Try from './Try';

function getNumbers() { // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
    // 함수 안에 this를 사용하지 않으면 class 밖에 선언 가능
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i += 1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseball extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         result: '',
    //         value: '',
    //         answer: getNumbers(),
    //         tries: [],
    //     }
    //     this.onSubmitForm = this.onSubmitForm.bind(this);
    // }

    state = {
        result: '',
        value: '',
        answer: getNumbers(), // ex: [1,3,5,7]
        tries: [], // push를 사용한 값 등록은 안됨 (불변성 유지!)
        // 불변성 유지란? 리액트의 경우, 렌더링을 하게 되는 기준이 기존 데이터가 달라졌느냐 아니냐
        // 만약 tries.push('a') 를 진행하게 되면, 
        // tries === tries > true가 뜨므로, state 가 변한 게 없으니까 렌더 안해야지! 하게 됨
        // 따라서 값을 넣고 새로 렌더링하게 하고 싶다면
        // tries: [...this.state.tries, {try:this.state.value, result:'홈런'}] 과 같은 식으로
        //          예전함수 복사           새로운 값 추가
        // 바꿔줘야 함
    };

    onChangeInput = (e) => {
        this.setState({
            value: e.target.value,
        })
    };

    // fruits = [
    //     { fruit: '사과', taste: '달다' },
    //     { fruit: '포도', taste: '새콤하다' },
    //     { fruit: '바나나', taste: '달콤하다' },
    //     { fruit: '배', taste: '아삭하다' },
    //     { fruit: '귤', taste: '상큼하다' },
    //     { fruit: '망고', taste: '달다' },
    // ];

    // hooks에서 사용하는 것과 동일한 형태
    inputRef = createRef();
    // onInputRef = (c) => { this.inputRef = c; };
    // 함수형은 함수 안에 다른 조건을 추가할 수 있으므로 자유도 높음

    onSubmitForm = (e) => {
        const { value, answer, tries } = this.state;
        e.preventDefault();
        if (value === answer.join('')) {
            this.setState((prevState) => {
                return {
                    result: '홈런!',
                    tries: [...prevState.tries, { try: value, result: '홈런' }],
                }
            });
            alert('게임을 다시 시작합니다.');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: []
            });
        } else {
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) {
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`,
                });
                alert('게임을 다시 시작합니다.');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: []
                });
            } else {
                for (let i = 0; i < 4; i += 1) {
                    if (answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                this.setState((prevState) => {
                    return {
                        tries: [...prevState.tries,
                        {
                            try: value,
                            result: `${strike} 스트라이크, ${ball} 볼입니다.`
                        }],
                        value: '',
                    }
                })
            }
        }
        this.inputRef.current.focus();
        // hooks에서 사용하는 것과 동일한 형태
    };

    // onSubmitForm() {
    //  this.state  > this 사용 불가
    // };
    // 이런 형태의 함수에서 this를 쓰려면 위 내용 처럼 constructor에서 바인드해줘야만 함

    render() {
        const { result, value, tries } = this.state; // 비구조화 할당
        return (
            <>
                <h1>{result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.inputRef} maxLength={4} value={value}
                        onChange={this.onChangeInput} />
                </form>
                <div>시도: {tries.length}</div>
                <ul>
                    {tries.map((v, i) => {
                        return (
                            <Try key={`${i + 1}차 시도 : `} tryInfo={v} />
                        );
                    })}
                </ul>
            </>
        );
    }
}

//export const hello = 'hello'; // import { hello }
//export const bye = 'hello'; // import { hello, bye }

export default NumberBaseball; // import NumberBaseball;

// 노드에서는 아래 내용만 지원
// const React = require('react');
// exports.hello = 'hello';
// module.exports = NumberBaseball;

// 이 때, import를 사용할 수 있는 이유는 babel에서 번역해주기 때문 
// webpack은 node가 실행하는 파일이라 const, exports, module.exports 식으로 써야 하고
// 그 외에는 babel이 번역해주므로 import를 써도 됨