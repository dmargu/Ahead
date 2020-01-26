import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { AsyncStorage } from 'react-native';
import ModalReducer from '../reducers/ModalReducer';
import TodoReducer from '../reducers/TodoReducer';
import AuthReducer from '../reducers/AuthReducer';
import StorageReducer from '../reducers/StorageReducer';
import ClassesReducer from '../reducers/ClassesReducer';

/*eslint-disable no-undef*/
//eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/*eslint-enable no-undef*/

const todoPersistConfig = {
  key: 'TodoReducer',
  storage: AsyncStorage,
  whitelist: ['todos'],
  stateReconciler: autoMergeLevel2
};

const storageConfig = {
  key: 'StorageReducer',
  storage: AsyncStorage,
  whitelist: ['notificationIDs', 'shouldConnectToIcal'],
  stateReconciler: autoMergeLevel2
};

const classConfig = {
  key: 'ClassesReducer',
  storage: AsyncStorage,
  whitelist: ['classes', 'homework', 'tests'],
  stateReconciler: autoMergeLevel2
};

const reducers = combineReducers({
  ModalReducer,
  StorageReducer: persistReducer(storageConfig, StorageReducer),
  TodoReducer: persistReducer(todoPersistConfig, TodoReducer),
  AuthReducer,
  ClassesReducer: persistReducer(classConfig, ClassesReducer)
});

export default function storeConfiguration() {
  const store = createStore(
    reducers,
    {},
    composeEnhancers(
      applyMiddleware(ReduxThunk)
    )
  );

  const persistor = persistStore(store);
  //persistor.purge();

  return { persistor, store };
}
