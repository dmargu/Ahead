import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { AsyncStorage } from 'react-native';
import reducers from '../reducers';

/*eslint-disable no-undef*/
//eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/*eslint-enable no-undef*/

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['TodoReducer'],
  stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default function storeConfiguration() {
  const store = createStore(
    persistedReducer,
    {},
    composeEnhancers(
      applyMiddleware(ReduxThunk)
    )
  );

  const persistor = persistStore(store);

  return { persistor, store };
}
