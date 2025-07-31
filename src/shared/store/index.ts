import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { authReducer } from '@/entities/user/model/authSlice';
import rootSaga from './rootSaga';

const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function initializeStore() {
  const sagaMiddleware = createSagaMiddleware();

  const newStore = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
  );

  if (typeof window !== 'undefined') {
    sagaMiddleware.run(rootSaga);
  }

  return newStore;
}
