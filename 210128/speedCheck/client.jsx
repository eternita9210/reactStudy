import React from 'react';
import ReactDom from 'react-dom';

import SpeedCheck from './SpeedCheck';
import SpeedCheckByHooks from './SpeedCheckByHooks';

ReactDom.render(<SpeedCheckByHooks/>, document.querySelector('#root'));