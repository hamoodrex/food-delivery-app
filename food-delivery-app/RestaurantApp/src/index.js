import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import GlobalStateProvider from './Context';
import registerServiceWorker from './registerServiceWorker';
const rootElement = document.getElementById('root');

ReactDOM.render(
  <GlobalStateProvider>
    <BrowserRouter>
      <App />,
    </BrowserRouter>
  </GlobalStateProvider>
 , rootElement);

//registerServiceWorker();

