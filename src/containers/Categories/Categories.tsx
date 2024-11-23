import Modal from '../../components/UI/Modal/Modal.tsx';
import FormCategories from '../../components/FormCategories/FormCategories.tsx';
import { changeShowModal, selectShowModal } from '../../store/slices/CategorySlice.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';



const Categories = () => {
  const dispatch = useAppDispatch();
  const show = useAppSelector(selectShowModal);

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
    </div>
  );
};

export default Categories;