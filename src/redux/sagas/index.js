
import { all } from 'redux-saga/effects';
import StudentWatcherSaga from './formSaga';

function* rootSaga() {
  yield all([StudentWatcherSaga()]);
}
export default rootSaga;