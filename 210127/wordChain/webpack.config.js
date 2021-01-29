const path = require('path'); // node에서 사용하는 경로 관련
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'wordChain-setting',
    mode: 'development', 
    devtool: 'eval',
    resolve: { 
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
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 1% in KR', 'last 2 chrome versions'],
                        },
                        debug: true,
                    }],
                    '@babel/preset-react'
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel'
                ],
            },
        }],
    },

    plugins: [
        new RefreshWebpackPlugin()
    ],

    // 출력
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist/'
    },

    devServer: {
        publicPath: '/dist/',
        hot: true
    }
};