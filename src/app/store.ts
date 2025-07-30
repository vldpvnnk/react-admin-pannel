import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { authReducer } from '@/entities/user/model/authSlice';
import rootSaga from './rootSaga';

const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

let store: Store | undefined;

export function initializeStore() {
  const sagaMiddleware = createSagaMiddleware();

  const newStore = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
  );

  // Запускаем саги только в браузере (иначе падает на сервере)
  if (typeof window !== 'undefined') {
    sagaMiddleware.run(rootSaga);
  }

  return newStore;
}
