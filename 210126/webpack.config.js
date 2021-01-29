const path = require('path'); // node에서 사용하는 경로 관련
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'wordChain-setting',
    mode: 'development', // 실서비스에서는 production으로 변경
    devtool: 'eval',
    resolve: { // entry에 사용되는 파일의 확장자를 사전에 등록하면 entry에서 굳이 쓰지 않아도 됨
        extensions: ['.js', '.jsx']
    },

    // 입력
    entry: {
        app: ['./client'],
    },

    // 모듈 적용 후
    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: [
                    // plugin 들의 모임 > preset
                    // env > browsers : 해당 앱이 지원하는 브라우저 설정 가능
                    // > 5% in KR 한국 점유율 5% 이상인 브라우저 지원 가능
                    // last 2 chrom versions 크롬 최신 버전순 2개까지 지원
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 1% in KR', 'last 2 chrome versions'],
                        },
                        debug : true,
                    }],
                    '@babel/preset-react'
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel',
                ],
            },
        }],
    },

    // 추가적인 작업
    plugins: [
        new RefreshWebpackPlugin()
    ],

    // 출력
    output: {
        path: path.join(__dirname, 'dist'),
        // 현재 폴더 안에 있는 dist 라는 의미
        // 현재 실제 경로: C:\Users\CREWMATE\studyForReact\dist
        filename: 'app.js',
        publicPath: '/dist/', // 가상 경로
    },

    // dev 서버 설정 (개발 편의를 위한 서버)
    devServer: {
        publicPath: '/dist/',
        hot: true
    },
};