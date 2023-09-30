// redux/store.js

import { createStore } from "redux";
import rootReducer from "./reducers";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Ovo omogućuje korištenje Redux DevTools u pregledniku
);

export default store;
