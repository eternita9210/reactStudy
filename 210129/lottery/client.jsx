import React from 'react';
import ReactDom from 'react-dom';
//import { hot } from 'react-refresh/root';

import Lottery from './Lottery';
import LotteryByHooks from './LotteryByHooks';

ReactDom.render(<LotteryByHooks/>, document.querySelector('#root'));