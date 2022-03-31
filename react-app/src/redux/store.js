import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});


const initialStore = {

  cartReducer :{
    cartItems:JSON.parse(localStorage.getItem('cartItems')) || []
  }
}

export const store = createStore(rootReducer, initialStore,
    composeEnhancers());