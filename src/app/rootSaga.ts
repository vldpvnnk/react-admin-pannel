import { authSaga } from '@/entities/user/model/authSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    authSaga()
  ]);
}
