import React, { useCallback, useEffect, useState } from 'react';
import { ITransactionForm } from '../../types';
import ButtonLoading from '../UI/ButtonLoading/ButtonLoading.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {  selectCategories } from '../../store/slices/CategorySlice.ts';
import {  fetchAllCategory } from '../../store/thunks/categoryThunk.ts';
import { toast } from 'react-toastify';
import { createTransaction } from '../../store/thunks/TransactionThunk.ts';
import { changeTransactionShowModal, selectAddTransactionLoading } from '../../store/slices/TransactionsSlice.ts';

const FormTransaction = () => {

  const initialForm: ITransactionForm = {
    type:'',
    category: '',
    amount: 0,
  };
  const [form, setForm] = useState<ITransactionForm>(initialForm);
  const type = ['income', 'expense'];
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const addLoading = useAppSelector(selectAddTransactionLoading);
  const fetchCategories = useCallback(async () => {
    await dispatch(fetchAllCategory());
  }, [dispatch]);
  useEffect(() => {
    void  fetchCategories();
  }, [ fetchCategories]);
  const changeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const addNewTransaction = async (e: React.FormEvent, form: ITransactionForm) => {
    e.preventDefault();
    // if (isEdit && id) {
    //   await dispatch(editCategory({ categoryId: id, category: { ...form } }));
    //   dispatch(changeIsEdit(id));
    //   toast.success("Dish was edited successfully.");
    // } else {

      if (form.category.trim().length > 0 && form.type.trim().length > 0 && form.amount>0) {
        await dispatch(createTransaction(
          { ...form, date:new Date().toISOString() }
        ));
        // await dispatch(fetchAllCategory());
        toast.success("Transaction added successfully.");
        setForm(initialForm);
        dispatch(changeTransactionShowModal());

      } else {
        toast.warning("Fill all fields.");
      }
    // }
  };
  return (
    <div>
      <div>
        <div className=" p-2 b fs-5 text-start">
          <form
            onSubmit={(e) => addNewTransaction(e, form)}
          >
            <div className="form-group mb-3">
              <label htmlFor="type" className="form-label ">
                {" "}
                Type
              </label>
              <select
                required
                id="type"
                value={form.type}
                onChange={changeForm}
                name="type"
                className="form-select"
              >
                <option className="fs-5" value="" disabled>
                  Select a type
                </option>
                {type.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="category" className="form-label ">
                {" "}
                Category
              </label>
              <select
                required
                id="category"
                value={form.category}
                onChange={changeForm}
                name="category"
                className="form-select"
              >
                <option className="fs-5" value="" disabled>
                  Select a category
                </option>
                {categories.map((c) => {if(form.type === c.category) return  <option key={c.id} value={c.name}>
                  {c.name}</option>; })}
                  </select>
                  </div>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label ">
                {" "}
                Name
              </label>
              <input
                className="mb-3 form-control"
                id="amount"
                name="amount"
                type="number"
                min={0}
                value={form.amount}
                onChange={changeForm}
                required
              />
            </div>

            <ButtonLoading
              isLoading={addLoading} isDisabled={addLoading}
                           type="submit"
                           // text={isEdit ? 'Save' : 'Add'}
              text={'Save'}
            />

          </form>
        </div>
      </div>
    </div>
  );
};

export default FormTransaction;