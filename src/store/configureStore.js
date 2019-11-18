import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import tickerReducer from '../reducers/ticker';
import accountReducer from '../reducers/account';
import balanceReducer from '../reducers/balance';
import loaderReducer from '../reducers/loader';
import modalReducer from '../reducers/modal';

let composeEnhancers = compose;

if(process.env.NODE_ENV === 'development'){
	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['ticker']
}

const rootReducer = combineReducers({
	ticker: tickerReducer,
	account: accountReducer,
  balance: balanceReducer,
  loading: loaderReducer,
  modal: modalReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
  const persistor = persistStore(store)
  return {store, persistor};
};