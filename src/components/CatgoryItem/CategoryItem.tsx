import React, { MouseEventHandler } from 'react';
import { ICategory } from '../../types';
import { changeIsEdit, selectDeleteLoading } from '../../store/slices/CategorySlice.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import Spinner from '../UI/Spinner/Spinner.tsx';

export interface ICategoryItemProps  extends ICategory{
  onDelete: MouseEventHandler;
}
const CategoryItem:React.FC<ICategoryItemProps> = ({name, category, onDelete, id}) => {
  const dispatch = useAppDispatch();
  const deleteLoading = useAppSelector(selectDeleteLoading);

  return (
    <div className={'border border-1 rounded-2 mt-3 p-3 d-flex justify-content-between align-items-center fs-3 '}>
<span className={'ms-2 fs-2 '}>{name}</span>
      <span className={'ms-auto'}>{category}</span>
        <div className="me-3">
          <button
            type="button"
            onClick={()=>dispatch(changeIsEdit(id))}
            className="d-inline-block mb-2 button-edit buttons-ic "
          ></button>
          <button
            type="button"
            onClick={onDelete}
            className="d-inline-block button-reset buttons-ic d-flex align-items-center pe-4"
            disabled={deleteLoading}
          >{deleteLoading?<div className={'ms-5 ps-2'}><Spinner/></div>: null}
          </button>
      </div>
    </div>
      );
      };

      export default CategoryItem;