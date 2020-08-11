import React from "react";
import ReactDOM from "react-dom";
import "./scss/index.scss";
import App from "./pages/App";
import * as serviceWorker from "./serviceWorker";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import loadingReducer from "./store/reducers/loading";

const rootReducer = combineReducers({
  loader: loadingReducer,
});

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
