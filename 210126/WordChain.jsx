// 파일을 쪼갤 때, 필요한 컴포넌트, 라이브러리를 import
const React = require('react');
const { Component } = React;

// 실제 동작 부분
class WordChain extends Component {
    state = {
        word: '제로초',
        value: '',
        result: '',
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
            this.setState({
                result: '딩동댕',
                word: value,
                value: ''
            })
        } else {
            this.setState({
                result: '땡',
                value: ''
            })
        }
        this.input.focus();
    }

    onChangeInput = (e) => {
        this.setState({ value: e.target.value });
    }

    input;

    onRefInput = (c) => {
        this.input = c;
    }

    render() {
        return (
            <>
                <div>{this.state.word}</div>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.onRefInput} value={this.state.value}
                        onChange={this.onChangeInput} />
                    <button type="submit">클릭</button>
                </form>
                <div>{this.state.result}</div>
            </>
        );
    }
}

// 다른 컴포넌트에서 불러올 수 있도록 하는 부분
module.exports = WordChain;