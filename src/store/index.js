import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';

/*eslint-disable no-undef*/
//eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/*eslint-enable no-undef*/
const AppStore = createStore(
  reducers, {},
  composeEnhancers(applyMiddleware(ReduxThunk))
);

export default AppStore;
