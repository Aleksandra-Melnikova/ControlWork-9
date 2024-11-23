import React, { useCallback, useEffect, useState } from "react";
import { ITransactionForm } from "../../types";
import ButtonLoading from "../UI/ButtonLoading/ButtonLoading.tsx";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectCategories } from "../../store/slices/CategorySlice.ts";
import { fetchAllCategory } from "../../store/thunks/categoryThunk.ts";
import { toast } from "react-toastify";
import {
  createTransaction,
  editTransaction,
  fetchAllTransactions,
  getOneTransactionById,
} from "../../store/thunks/TransactionThunk.ts";
import {
  changeIsTransactionEdit,
  changeTransactionShowModal,
  selectAddTransactionLoading,
  selectEditTransactionLoading,
  selectFetchingOneTransactionLoading,
  selectIdTransactionEdit,
  selectOneTransaction,
  selectTransactionEdit,
} from "../../store/slices/TransactionsSlice.ts";
import Spinner from "../UI/Spinner/Spinner.tsx";

const FormTransaction = () => {
  const initialForm: ITransactionForm = {
    type: "",
    category: "",
    amount: 0,
  };
  const [form, setForm] = useState<ITransactionForm>(initialForm);
  const [IdCategory, setIdCategory] = useState("");
  const type = ["income", "expense"];
  const [currentType, setCurrentType] = useState({
    type: "",
    category: "",
  });
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const addLoading = useAppSelector(selectAddTransactionLoading);
  const isEdit = useAppSelector(selectTransactionEdit);
  const id = useAppSelector(selectIdTransactionEdit);
  const isEditLoading = useAppSelector(selectEditTransactionLoading);
  const getOneLoading = useAppSelector(selectFetchingOneTransactionLoading);
  const oneTransaction = useAppSelector(selectOneTransaction);
  const fetchCategories = useCallback(async () => {
    await dispatch(fetchAllCategory());
  }, [dispatch]);
  useEffect(() => {
    void fetchCategories();
  }, [fetchCategories]);

  const changeForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    categories.map((category) => {
      if (category.name === form.category) {
        setIdCategory(category.id);
      }
    });
    setForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    if (id) {
      if (oneTransaction) {
        categories.map((category) => {
          if (category.id === oneTransaction.category) {
            setCurrentType({
              type: category.category,
              category: category.name,
            });
          }
        });
        setForm({
          type: currentType.type,
          category: currentType.category,
          amount: oneTransaction.amount,
        });
      }
    } else {
      setForm({ type: "", category: "", amount: 0 });
    }
  }, [oneTransaction, categories, id, currentType.type, currentType.category]);

  const getTransactionById = useCallback(async () => {
    if (id) {
      await dispatch(getOneTransactionById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    void getTransactionById();
  }, [dispatch, getTransactionById]);

  const addNewTransaction = async (
    e: React.FormEvent,
    form: ITransactionForm,
  ) => {
    e.preventDefault();
    if (isEdit && id) {
      await dispatch(
        editTransaction({
          Id: id,
          transaction: {
            category: IdCategory,
            amount: form.amount,
            date: new Date().toISOString(),
          },
        }),
      );
      await dispatch(fetchAllTransactions());
      dispatch(changeIsTransactionEdit(id));
      toast.success("Transaction was edited successfully.");
    } else {
      if (
        form.category.trim().length > 0 &&
        form.type.trim().length > 0 &&
        form.amount > 0
      ) {
        await dispatch(
          createTransaction({
            category: IdCategory,
            amount: form.amount,
            date: new Date().toISOString(),
          }),
        );
        await dispatch(fetchAllTransactions());
        toast.success("Transaction added successfully.");
        setForm(initialForm);
        dispatch(changeTransactionShowModal());
      } else {
        toast.warning("Fill all fields.");
      }
    }
  };
  return (
    <>
      {getOneLoading ? (
        <Spinner />
      ) : (
        <div>
          <div>
            <div className=" p-2 b fs-5 text-start">
              <form onSubmit={(e) => addNewTransaction(e, form)}>
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
                    {categories.map((c) => {
                      if (form.type === c.category)
                        return (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        );
                    })}
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
                  isLoading={addLoading || isEditLoading}
                  isDisabled={addLoading || isEditLoading}
                  type="submit"
                  text={isEdit ? "Save" : "Add"}
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormTransaction;
