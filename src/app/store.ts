import { configureStore } from "@reduxjs/toolkit";
import { categoryReducer } from "../store/slices/CategorySlice.ts";
import { transactionReducer } from "../store/slices/TransactionsSlice.ts";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    transaction: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
