import { createStore, applyMiddleware, combineReducers } from "redux";
import { createWrapper } from "next-redux-wrapper";
import cartReducer from "../reducers/cartReducer";
import userReducer from "../reducers/userReducer";
import configReducer from "../reducers/configReducer";
import thunkMiddleware from "redux-thunk";

const combinedReducer = combineReducers({
  cartReducer,
  userReducer,
  configReducer,
});
const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore = ({ isServer }) => {
  if (isServer) {
    //Si esta en la parte del server crea el store
    return createStore(combinedReducer, bindMiddleware([thunkMiddleware]));
  } else {
    //si esta en la parte de cliente crea un store con persistencia
    const { persistStore, persistReducer } = require("redux-persist");
    const storage = require("redux-persist/lib/storage").default;

    const persistConfig = {
      key: "nextjs",
      whitelist: ["cartReducer", "userReducer", "configReducer"], // que reducer tiene persistencia
      storage, // donde guarda la persistencia
    };

    const persistedReducer = persistReducer(persistConfig, combinedReducer); // Combinamos con persistencia

    const store = createStore(
      persistedReducer,
      bindMiddleware([thunkMiddleware])
    ); // Creating the store again

    store.__persistor = persistStore(store); // creamos el objeto y lo pusheamos al persistor

    return store;
  }
};

// wrapper para _app.js
export const wrapper = createWrapper(makeStore);
