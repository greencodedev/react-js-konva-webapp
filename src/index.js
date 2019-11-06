import React from 'react';
import { render } from 'react-dom';
import * as serviceWorker from './serviceWorker';
import store from './store/index';
import Root from './router/router';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';

render(
    <Root store={ store } />,
    document.getElementById('root')
);
serviceWorker.unregister();
