import Modal from "../../components/UI/Modal/Modal.tsx";
import FormTransaction from "../../components/FormTransaction/FormTransaction.tsx";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  changeTransactionShowModal,
  selectFetchTransactionLoading,
  selectTransactionEdit,
  selectTransactions,
  selectTransactionShowModal,
} from "../../store/slices/TransactionsSlice.ts";
import { useCallback, useEffect } from "react";
import {
  deleteOneTransaction,
  fetchAllTransactions,
} from "../../store/thunks/TransactionThunk.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import TransactionItem from "../../components/TransationItem/TransactionItem.tsx";
import { selectCategories } from "../../store/slices/CategorySlice.ts";
import { IArray } from "../../types";

const Home = () => {
  const show = useAppSelector(selectTransactionShowModal);
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const isEdit = useAppSelector(selectTransactionEdit);
  const categories = useAppSelector(selectCategories);
  const isFetchTransactionLoading = useAppSelector(
    selectFetchTransactionLoading,
  );
  const transactionsArray: IArray[] = [];
  categories.map((category) => {
    transactions.map((transaction) => {
      if (category.id === transaction.category) {
        transactionsArray.push({
          id: transaction.id,
          amount: transaction.amount,
          name: category.name,
          type: category.category,
          date: transaction.date,
        });
      }
    });
  });
  const fetchTransactions = useCallback(async () => {
    await dispatch(fetchAllTransactions());
  }, [dispatch]);
  useEffect(() => {
    void fetchTransactions();
  }, [fetchTransactions]);
  const deleteTransaction = async (id: string) => {
    await dispatch(deleteOneTransaction(id));
    await fetchTransactions();
  };
  const newArray: IArray[] = [];
  transactionsArray.map((transaction) => {
    categories.map((category) => {
      if (transaction.name === category.name) {
        newArray.push(transaction);
      }
    });
  });
  const total = newArray.reduce((acc, transaction) => {
    if (transaction.type === "expense") acc -= Number(transaction.amount);
    else {
      acc += Number(transaction.amount);
    }
    return acc;
  }, 0);
  const transactionsSort = newArray.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  return (
    <div>
      <div className={"my-4 fs-3"}>
        {" "}
        Total: <strong>{total}</strong>
      </div>
      <div>
        {isFetchTransactionLoading ? (
          <Spinner />
        ) : (
          <>
            {" "}
            <Modal
              show={show}
              title={isEdit ? "Edit Expense/Income" : "Add Expense/Income"}
              closeModal={() => dispatch(changeTransactionShowModal())}
            >
              <FormTransaction />
            </Modal>
            {transactionsSort.length > 0 ? (
              <>
                {transactionsSort.map((transaction) => (
                  <TransactionItem
                    id={transaction.id}
                    onDelete={() => deleteTransaction(transaction.id)}
                    key={transaction.id}
                    type={transaction.type}
                    name={transaction.name}
                    date={transaction.date}
                    amount={transaction.amount}
                  />
                ))}
              </>
            ) : (
              <p className={"mt-5 text-center"}>No transactions</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
