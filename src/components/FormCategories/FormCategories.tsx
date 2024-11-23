import { useState } from 'react';
import { IForm } from '../../types';
import { createCategory } from '../../store/thunks/categoryThunk.ts';
import { toast } from 'react-toastify';
import { useAppDispatch, } from '../../app/hooks.ts';
import { changeShowModal,  } from '../../store/slices/CategorySlice.ts';

const initialForm: IForm = {
  category: '',
  name: '',
};
const FormCategories = () => {
  const category = ['income', 'expense'];
  const [form, setForm] = useState<IForm>(initialForm);
  const dispatch = useAppDispatch();
  const changeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const addNewCategory = async (e: React.FormEvent, form: IForm) => {
    e.preventDefault();
    // if (id) {
    //   await dispatch(editMenuItem({ dishId: id, dish: { ...form } }));
    //   navigate("/admin");
    //   toast.success("Dish was edited successfully.");
    // } else {
      if (form.category.trim().length > 0 && form.name.trim().length > 0) {
        await dispatch(createCategory({ ...form }));
        toast.success("Category added successfully.");
        setForm(initialForm);
        dispatch(changeShowModal());

      } else {
        toast.warning("Fill in the title field.");
      }
    // }
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

          <button className="ps-4 pe-4 btn btn-info" type="submit">
            Save
          </button>
          {" "}
        </form>
      </div>
</div>
)
  ;
};

export default FormCategories;