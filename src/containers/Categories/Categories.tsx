import Modal from '../../components/UI/Modal/Modal.tsx';
import FormCategories from '../../components/FormCategories/FormCategories.tsx';
import {
  changeShowModal,
  selectCategories,
  selectEdit,
  selectFetchLoading,
  selectShowModal
} from '../../store/slices/CategorySlice.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useCallback, useEffect } from 'react';
import { deleteOneCategory, fetchAllCategory } from '../../store/thunks/categoryThunk.ts';
import CategoryItem from '../../components/CatgoryItem/CategoryItem.tsx';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';



const Categories = () => {
  const dispatch = useAppDispatch();
  const show = useAppSelector(selectShowModal);
  const categories = useAppSelector(selectCategories);
  const isEdit = useAppSelector(selectEdit);
  const isFetchLoading = useAppSelector(selectFetchLoading);
  const fetchCategories = useCallback(async () => {
    await dispatch(fetchAllCategory());
  }, [dispatch]);
  useEffect(() => {
      void  fetchCategories();
  }, [ fetchCategories]);
  const deleteCategory = async (id: string) => {
    await dispatch(deleteOneCategory(id));
    await  fetchCategories();
  };

  return (
    <div>
<div className={'d-flex justify-content-between active my-3'}>
  <h2>Categories</h2>
  <button className={'btn btn-primary px-5 py-0'} onClick={()=>dispatch(changeShowModal())} type={'button'}>Add</button>

</div>
      {isFetchLoading?
        <Spinner/>:
        <> <Modal   show={show}
                                             title={isEdit ? "Edit Category": 'Add Category'}
                                             closeModal={()=>dispatch(changeShowModal())}>
        <FormCategories />
      </Modal>
        {categories.length > 0 ? <>{categories.map((category) => (
            <CategoryItem onDelete={() => deleteCategory(category.id)}
                          key={category.id} category={category.category}
                          name={category.name} id={category.id}/>
          ))}</>:<p className={'mt-5 text-center'}>No categories</p>
        }
        </>}

    </div>
  );
};

export default Categories;