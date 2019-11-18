import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { AsyncStorage } from 'react-native';
import ModalReducer from '../reducers/ModalReducer';
import TodoReducer from '../reducers/TodoReducer';
import RemindersReducer from '../reducers/RemindersReducer';
import AuthReducer from '../reducers/AuthReducer';

/*eslint-disable no-undef*/
//eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/*eslint-enable no-undef*/

const todoPersistConfig = {
  key: 'todoReducer',
  storage: AsyncStorage,
  whitelist: ['todos'],
  stateReconciler: autoMergeLevel2
};

const remindersPersistConfig = {
  key: 'remindersreducer',
  storage: AsyncStorage,
  whitelist: ['notificationIDs'],
  stateReconciler: autoMergeLevel2
};

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['TodoReducer', 'RemindersReducer'],
  stateReconciler: autoMergeLevel2
};

const reducers = combineReducers({
  ModalReducer,
  TodoReducer: persistReducer(todoPersistConfig, TodoReducer),
  RemindersReducer: persistReducer(remindersPersistConfig, RemindersReducer),
  AuthReducer
});

const persistedReducer = persistReducer(rootPersistConfig, reducers);

export default function storeConfiguration() {
  const store = createStore(
    persistedReducer,
    {},
    composeEnhancers(
      applyMiddleware(ReduxThunk)
    )
  );

  const persistor = persistStore(store);
  //persistor.purge();

  return { persistor, store };
}
