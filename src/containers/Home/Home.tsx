
import Modal from '../../components/UI/Modal/Modal.tsx';
import FormTransaction from '../../components/FormTransaction/FormTransaction.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {
  changeTransactionShowModal,  selectFetchTransactionLoading,
  selectTransactions,
  selectTransactionShowModal
} from '../../store/slices/TransactionsSlice.ts';
import { useCallback, useEffect } from 'react';
import { deleteOneTransaction, fetchAllTransactions } from '../../store/thunks/TransactionThunk.ts';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';

import TransactionItem from '../../components/TransationItem/TransactionItem.tsx';



const Home = () => {
  const show = useAppSelector(selectTransactionShowModal);
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);

  const isFetchTransactionLoading = useAppSelector(selectFetchTransactionLoading);
  const fetchTransactions = useCallback(async () => {
    await dispatch(fetchAllTransactions());
  }, [dispatch]);
  useEffect(() => {
    void  fetchTransactions();
  }, [ fetchTransactions]);
  const deleteCategory = async (id: string) => {
    await dispatch(deleteOneTransaction(id));
    await  fetchTransactions();
  };
  return (
    <div>

      <div>
        {isFetchTransactionLoading?
          <Spinner/>:
          <>   <Modal   show={show}
            // title={isEdit ? "Edit Category": 'Add Category'}
                        title={'Add Expense/Income'}
                        closeModal={()=>dispatch(changeTransactionShowModal())}>
            <FormTransaction />
          </Modal>
            {transactions.length > 0 ? <>{transactions.map((transaction) => (
              <TransactionItem
                onDelete={() => deleteCategory(transaction.id)}
                key={transaction.date} type={transaction.type}
                name={transaction.category} date={transaction.date}  amount={transaction.amount} />
            ))}</>:<p className={'mt-5 text-center'}>No categories</p>
            }
          </>}
      </div>
    </div>
  );
};

export default Home;