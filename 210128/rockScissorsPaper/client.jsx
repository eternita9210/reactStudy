import React from 'react';
import ReactDom from 'react-dom';

import RockScissorsPaper from './RockScissorsPaper';
import RockScissorsPaperByHooks from './RockScissorsPaperByHooks';

ReactDom.render(<RockScissorsPaperByHooks/>, document.querySelector('#root'));