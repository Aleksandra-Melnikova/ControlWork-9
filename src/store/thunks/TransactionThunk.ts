import { createAsyncThunk } from "@reduxjs/toolkit";
import { IFormTransaction, ITransaction, ITransactionList } from "../../types";
import axiosApi from "../../axiosAPI.ts";

export const createTransaction = createAsyncThunk<void, IFormTransaction>(
  "transaction/createTransaction",
  async (form) => {
    await axiosApi.post("transaction.json", { ...form });
  },
);

export const fetchAllTransactions = createAsyncThunk<ITransaction[], void>(
  "transaction/fetchAllTransactions",
  async () => {
    const response: { data: ITransactionList | null } =
      await axiosApi("transaction.json");
    const transactionList = response.data;
    if (transactionList === null) {
      return [];
    }
    const transactions: ITransactionList = transactionList;

    return Object.keys(transactionList).map((transactoin) => {
      return {
        ...transactions[transactoin],
        id: transactoin,
      };
    });
  },
);

export const deleteOneTransaction = createAsyncThunk<void, string>(
  "transaction/deleteOneTransaction ",
  async (Id: string) => {
    await axiosApi.delete(`transaction/${Id}.json`);
  },
);

export const getOneTransactionById = createAsyncThunk<
  ITransaction | null,
  string
>("transaction/getOneTransactionById  ", async (Id) => {
  const response = await axiosApi<ITransaction | null>(
    `transaction/${Id}.json`,
  );
  return response.data || null;
});
export const editTransaction = createAsyncThunk<
  void,
  { Id: string; transaction: IFormTransaction }
>("transaction/editTransaction", async ({ Id, transaction }) => {
  await axiosApi.put(`transaction/${Id}.json`, { ...transaction });
});
