import React, { PureComponent } from 'react';

class Try extends PureComponent {
    render() {
        const { tryInfo } = this.props;
        return (
            <li>
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div>
            </li>
            // <li>
            //     <b>{this.props.value.fruit}</b> - {this.props.index}
            // </li>
            // key={i} 의 경우, i(index)가 중복값은 없지만 성능최적화에 
            // 문제가 될 수 있어 사용하지 않음
        );
    }
}

export default Try;