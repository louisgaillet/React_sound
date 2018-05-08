import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
if(navigator.serviceWorker){
  console.log('worker good');
  navigator.serviceWorker.register('../sw.js')
  .catch(err => console.error);
}
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </Provider>
  , document.querySelector('#app'));
