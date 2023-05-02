import { all } from 'redux-saga/effects';

import knotsSaga from './knots';
import languagesSaga from './languages';

export default function* rootSaga() {
  yield all([knotsSaga(), languagesSaga()]);
}
