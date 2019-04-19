/* global window:true */
import {
  createStore,
  applyMiddleware,
  compose
} from "redux";
import createSagaMiddleware from "redux-saga";

import reducer from "Reducers/";
import sagasManager from "Utils/sagasManager";
// import { configStorage } from 'Utils/storage'

const sagaMiddleware = createSagaMiddleware();

const isProd = process.env.NODE_ENV === "production";
let composeEnhancers = compose;
if (!isProd && window) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export default function configureStore(initialState) {
  let finalCreateStore;
  if (isProd) {
    finalCreateStore = composeEnhancers(applyMiddleware(sagaMiddleware))(
      createStore
    );
  } else {
    finalCreateStore = composeEnhancers(
      applyMiddleware(sagaMiddleware)
      //window.devToolsExtension ? window.devToolsExtension() : f => f
    )(createStore);
  }

  const store = finalCreateStore(reducer, initialState);

  // configStorage()
  sagaMiddleware.run(sagasManager.getRootSaga());

  if (!isProd && module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers/", () => {
      const nextReducer = reducer;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}