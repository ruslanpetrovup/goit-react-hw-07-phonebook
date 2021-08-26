// import { act } from "react-dom/cjs/react-dom-test-utils.production.min";
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import listReducer from "./phonebookReducer";
import { persistStore, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER} from 'redux-persist';




const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
]

const store = configureStore({
  reducer: listReducer,
    devTools: process.env.NODE_ENV === "development",
    middleware
})
// const persistor = persistStore(store)
// const listStore = store
export default store