
import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
} from "redux";
import createSagaMiddleware from 'redux-saga';
import rootReducer from './redux/reducers/index';
import rootSaga from './redux/sagas/index';

const saga = createSagaMiddleware();

const composeEnhancers =window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(saga))
);

saga.run(rootSaga);







