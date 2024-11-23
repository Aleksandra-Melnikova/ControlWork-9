import React from 'react';
import { IForm } from '../../types';


const CategoryItem:React.FC<IForm> = ({name, category}) => {
  return (
    <div className={'border border-1 rounded-2 mt-3 p-3 d-flex justify-content-between align-items-center fs-3 '}>
<span className={'ms-2 fs-2 '}>{name}</span>
      <span className={'ms-auto'}>{category}</span>
        <div className="me-3">
          <button
            type="button"
            // onClick={onEdit}
            className="d-inline-block mb-2 button-edit buttons-ic "
          ></button>
          <button
            type="button"
            // onClick={onDelete}
            className="d-inline-block button-reset buttons-ic d-flex align-items-center pe-0"
            // disabled={isDeleteLoading}
          >
          </button>
      </div>
    </div>
      );
      };

      export default CategoryItem;