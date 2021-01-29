// 21 01 27 Third
import React, { PureComponent } from 'react';

class Test extends PureComponent {
    state = {
        counter: 0,
        string: 'hello',
        number: 1,
        boolean: true,
        object: {},
        array: []
    };

    // chrome 확장 프로그램 중 react development tools 를 깔고
    // 설정에  Highlight updates when components render. 체크를하면
    // 렌더링을 통한 업데이트가 될 때마다 컴포넌트에 색상 하이라이트가 쳐짐
    // 파랑 > 녹색 > 노랑 > 적색 순으로 가며, 적색으로 갈 수록 나쁜 성능
    onClick = () => {
        const array = this.state.array;
        array.push(1);
        this.setState({
            array: [...this.state.array, 1],
        });
        // 렌더링은 state가 변경될 때만이 아니라 그냥 setState 함수가 불러질 때 실행됨!
        // 즉, setState가 컴포넌트 내에 많을 수록 성능 하이라이트가 적색으로 바뀌는 것.
    };

    // 이때 언제 컴포넌트가 업데이트 되어야만 하는지!를 정하는 함수 shouldComponentUpdate()사용
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if(this.state.counter !== nextState.counter) {
    //         return true;
    //     }
    //     return false;
    // }
    
    // 또는 extends Component가 아니라 PureComponent로 바꿔서 상속하면 동일한 효과가 나타남
    // PureComponent는 state가 변경되는 것을 기준으로 렌더링을 판단하는데 
    // 배열이나 객체가 state인 경우 잘 알아차리지 못해 에러 날 수 있음

    render() {
        console.log('렌더링', this.state);
        // 리액트 원칙 1.
        // 이 부분에 setState() 선언하는 경우,
        //  render() > setState() > render() > setState()...
        // setState가 렌더링을 발생시키는데 그 다음 함수가 또
        // render() 이므로 무한 반복 발생!
        // render() 아래에는 setState하지 말 것
        return (
            <div><button onClick={this.onClick}>클릭</button></div>
        )
    }
}

export default Test;