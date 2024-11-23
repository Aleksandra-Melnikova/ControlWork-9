import { useCallback, useEffect, useState } from 'react';
import { IForm } from '../../types';
import {
  createCategory,
  editCategory, fetchAllCategory,
  getOneCategoryById
} from '../../store/thunks/categoryThunk.ts';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector, } from '../../app/hooks.ts';
import {
  changeIsEdit,
  changeShowModal, selectAddLoading,
  selectEdit, selectEditLoading,
  selectIdEdit,
  selectOneCategory,
} from '../../store/slices/CategorySlice.ts';
import ButtonLoading from '../UI/ButtonLoading/ButtonLoading.tsx';

const initialForm: IForm = {
  category: '',
  name: '',
};
const FormCategories = () => {
  const category = ['income', 'expense'];
  const [form, setForm] = useState<IForm>(initialForm);
  const dispatch = useAppDispatch();
  const isEdit= useAppSelector(selectEdit);
  const id = useAppSelector(selectIdEdit);
  const isEditLoading= useAppSelector(selectEditLoading);
  const isCreateLoading = useAppSelector(selectAddLoading);


  const oneCategory = useAppSelector(selectOneCategory);
  const changeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  useEffect(() => {
    if (id) {
      if (oneCategory) setForm({ ...oneCategory });
    } else {
      setForm({ ...initialForm });
    }
  }, [oneCategory, id]);
  const getCategoryById = useCallback(async () => {
    if (id) {
      dispatch(getOneCategoryById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    void getCategoryById();
  }, [dispatch, getCategoryById]);
  const addNewCategory = async (e: React.FormEvent, form: IForm) => {
    e.preventDefault();
    if (isEdit && id) {
      await dispatch(editCategory({ categoryId: id, category: { ...form } }));
      dispatch(changeIsEdit(id));
      toast.success("Category was edited successfully.");
    } else {
      if (form.category.trim().length > 0 && form.name.trim().length > 0) {
        await dispatch(createCategory({ ...form }));
        await dispatch(fetchAllCategory());
        toast.success("Category added successfully.");
        setForm(initialForm);
        dispatch(changeShowModal());

      } else {
        toast.warning("Fill all fields.");
      }
    }
  };
  return (
    <div>
      <div className=" p-2 b fs-5 text-start">
        <form onSubmit={(e)=>addNewCategory(e, form)} >
          <div className="form-group mb-3">
            <label htmlFor="type" className="form-label ">
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
                {category.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label ">
              {" "}
              Name
            </label>
            <input
              className="mb-3 form-control"
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={changeForm}
              required
            />
          </div>

          <ButtonLoading isLoading={isEditLoading || isCreateLoading} isDisabled={isEditLoading || isCreateLoading} type="submit" text= {isEdit? 'Save' : 'Add'}/>

        </form>
      </div>
</div>
)
  ;
};

export default FormCategories;