import React from 'react';
import ReactDom from 'react-dom';

import NumberBaseball from './NumberBaseball'
import NumberBaseballMadeByHooks from './NumberBaseballMadeByHooks';
import Test from './RenderTest';

ReactDom.render(<NumberBaseballMadeByHooks />, document.querySelector('#root'));