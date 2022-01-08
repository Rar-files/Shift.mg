import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Reset} from 'styled-reset'

ReactDOM.render(
  <>
    <React.StrictMode>
      <Reset/>
    </React.StrictMode>
    <App />
  </>,
  document.getElementById('root')
);
