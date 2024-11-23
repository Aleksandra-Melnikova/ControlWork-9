
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';

import {
  createTransaction,
  deleteOneTransaction, editTransaction,
  fetchAllTransactions,
  getOneTransactionById
} from '../thunks/TransactionThunk.ts';
import { ITransaction, ITransactionForm, } from '../../types';

interface TransactionState {
  showModal: boolean;
  isAddTransactionLoading: boolean;
  transactions: ITransaction [];
  oneTransaction: ITransactionForm | null;
  isFetchTransactionLoading: boolean;
  isDeleteLoading: boolean;
  isFetchOneLoading: boolean;
  isEditLoading: boolean;
  isEdit: boolean;
  idEdit: string | null;
}

const initialState: TransactionState = {
  showModal: false,
  isAddTransactionLoading: false,
  transactions:[],
  isFetchTransactionLoading: false,
  oneTransaction: null,
  isDeleteLoading: false,
  isEditLoading: false,
  isFetchOneLoading: false,
  isEdit: false,
  idEdit: null,
};
export const selectAddTransactionLoading = (state: RootState) => state.transaction.isAddTransactionLoading;
export const selectTransactionShowModal = (state: RootState) => state.transaction.showModal;
export const selectTransactions = (state: RootState) => state.transaction.transactions;
export const selectFetchTransactionLoading = (state: RootState) => state.transaction.isFetchTransactionLoading;
export const selectDeleteTransactionLoading = (state: RootState) => state.transaction.isDeleteLoading;
export const selectOneTransaction = (state: RootState) => state.transaction.oneTransaction;
export const selectEditTransactionLoading = (state: RootState) => state.transaction.isEditLoading;
export const selectFetchOneTransactionLoading = (state: RootState) => state.transaction.isFetchOneLoading;
export const selectTransactionEdit = (state: RootState) => state.transaction.isEdit;
export const selectIdTransactionEdit = (state: RootState) => state.transaction.idEdit;


const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    changeTransactionShowModal: (state) => {
      state.showModal = !state.showModal;
    },
    changeIsTransactionEdit: (state, action:PayloadAction<string>) => {
      state.isEdit = !state.isEdit;
      state.showModal = !state.showModal;
      state.idEdit = action.payload;
      if( !state.showModal){
        state.idEdit = null
      }
    },
  },
    extraReducers: (builder) => {
      builder
        .addCase(createTransaction.pending, (state) => {
          state. isAddTransactionLoading = true;
        })
        .addCase(createTransaction.fulfilled, (state) => {
          state. isAddTransactionLoading = false;
        })
        .addCase(createTransaction.rejected, (state) => {
          state. isAddTransactionLoading  = false;
        })
        .addCase(fetchAllTransactions.pending, (state) => {
          state.isFetchTransactionLoading= true;
        })
        .addCase(
          fetchAllTransactions.fulfilled,
          (state, action: PayloadAction<ITransaction[]>) => {
            state.isFetchTransactionLoading = false;
            state.transactions = action.payload;
          },
        )
        .addCase(fetchAllTransactions.rejected, (state) => {
          state.isFetchTransactionLoading= false;
        })
        .addCase(deleteOneTransaction.pending, (state) => {
          state.isDeleteLoading = true;
        })
        .addCase(deleteOneTransaction.fulfilled, (state) => {
          state.isDeleteLoading = false;
        })
        .addCase(deleteOneTransaction.rejected, (state) => {
          state.isDeleteLoading = false;
        })
        .addCase(getOneTransactionById.pending, (state) => {
          state.isFetchOneLoading = true;
          state.oneTransaction = null;
        })
        .addCase(
          getOneTransactionById.fulfilled,
          (state, action: PayloadAction<ITransactionForm| null>) => {
            state.isFetchOneLoading  = false;
            state.oneTransaction = action.payload;
          },
        )
        .addCase(getOneTransactionById.rejected, (state) => {
          state.isFetchOneLoading  = false;
        })
        .addCase(editTransaction.pending, (state) => {
          state.isEditLoading = true;
        })
        .addCase(editTransaction.fulfilled, (state) => {
          state.isEditLoading = false;
          state.oneTransaction= null;
        })
        .addCase(editTransaction.rejected, (state) => {
          state.isEditLoading = false;
        });
    },
  });


export const transactionReducer = transactionSlice.reducer;
export const {changeTransactionShowModal, changeIsTransactionEdit} = transactionSlice.actions;
