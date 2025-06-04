// lib/store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { publicApi } from "./api/publicApi"; // Import publicApi
import cartReducer from "./features/cart/cartSlice";
import productsReducer from "./features/products/productsSlice"; // Import productsReducer
import themeReducer from "./features/theme/themeSlice";
import { storage } from "./redux/persistConfig";

// Combine all reducers
const combinedReducer = combineReducers({
  cart: cartReducer,
  theme: themeReducer,
  products: productsReducer, // Add productsReducer to the combined reducers
  [publicApi.reducerPath]: publicApi.reducer, // Add the publicApi reducer
});

// Create root reducer with hydration
const rootReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return combinedReducer(state, action);
};

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "theme", "products"],
};

// Use persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

let store: ReturnType<typeof makeStore> | undefined;

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, HYDRATE],
        },
      }).concat(publicApi.middleware), // Add publicApi middleware
    devTools: process.env.NODE_ENV !== "production",
  });

  const persistor = persistStore(store);
  (store as any).__persistor = persistor;

  return store;
};

// Get store singleton for client-side
export function getStore() {
  if (typeof window === "undefined") return makeStore();
  if (!store) store = makeStore();
  return store;
}

export const wrapper = createWrapper(makeStore, { debug: process.env.NODE_ENV === "development" });

// Infer types from store
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
