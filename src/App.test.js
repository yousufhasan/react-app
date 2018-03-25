import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";
import './tests/mock-local-storage';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(  <Provider store={store}><App /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
