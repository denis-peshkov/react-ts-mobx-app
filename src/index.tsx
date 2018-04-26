import { observable } from 'mobx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';


class Timer {
  @observable public start = Date.now();
}

const t = new Timer();
module.exports = {t};

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
