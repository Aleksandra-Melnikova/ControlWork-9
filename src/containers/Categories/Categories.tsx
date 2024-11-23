import Modal from '../../components/UI/Modal/Modal.tsx';
import FormCategories from '../../components/FormCategories/FormCategories.tsx';
import { changeShowModal, selectCategories, selectShowModal } from '../../store/slices/CategorySlice.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useCallback, useEffect } from 'react';
import { fetchAllCategory } from '../../store/thunks/categoryThunk.ts';
import CategoryItem from '../../components/CatgoryItem/CategoryItem.tsx';



const Categories = () => {
  const dispatch = useAppDispatch();
  const show = useAppSelector(selectShowModal);
  const categories = useAppSelector(selectCategories);
  const fetchContacts = useCallback(async () => {
    await dispatch(fetchAllCategory());
  }, [dispatch]);
  useEffect(() => {
    {
      void fetchContacts();
    }
  }, [fetchContacts]);

  return (
    <div>
<div className={'d-flex justify-content-between active my-3'}>
  <h2>Categories</h2>
  <button className={'btn btn-primary px-5 py-0'} onClick={()=>dispatch(changeShowModal())} type={'button'}>Add</button>
</div>
      <Modal   show={show}
               title={"Add Category"}
               closeModal={()=>dispatch(changeShowModal())}>
        <FormCategories />
      </Modal>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category.category} name={category.name}/>
      ))}
    </div>
  );
};

export default Categories;