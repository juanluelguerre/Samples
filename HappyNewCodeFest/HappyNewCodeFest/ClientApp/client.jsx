import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

if (module.hot) {
    module.hot.accept();
}

ReactDOM.render(
    <div>
        <App/>
    </div>,
    document.getElementById('app')
);
