import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../shared/api/apiClient';
import { loginSuccess, loginFailure, loginRequest } from './authSlice';
import { LoginPayload, AuthTokens } from '../types';
import { endpoints } from '@/shared/config/endpoints';

function* loginWorker(
  action: { payload: LoginPayload }
): Generator {
  try {
    const formData = new FormData();
    formData.append('email', action.payload.email);
    formData.append('password', action.payload.password);

    const response = (yield call(api.post, endpoints.auth, formData)) as { data: AuthTokens };
    const data = response.data;

    if (typeof window !== 'undefined') {
      window.location.href = `/api/set-token?access_token=${data.access_token}&refresh_token=${data.refresh_token}`;
    }
    yield put(loginSuccess(data));
  } catch (err) {
    const errorMessage =
      (err as { response?: { data?: { message?: string }[] } })?.response?.data?.[0]?.message ||
      'Ошибка логина';
    yield put(loginFailure(errorMessage));
  }
}

export function* authSaga() {
  yield takeLatest(loginRequest, loginWorker); 
}
