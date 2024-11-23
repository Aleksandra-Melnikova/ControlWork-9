import React, { MouseEventHandler } from "react";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  changeIsTransactionEdit,
  selectDeleteTransactionLoading,
} from "../../store/slices/TransactionsSlice.ts";
import Spinner from "../UI/Spinner/Spinner.tsx";
export interface ITransactionItemProps {
  date: string;
  name: string;
  type: string;
  id: string;
  amount: number;
  onDelete: MouseEventHandler;
}

const TransactionItem: React.FC<ITransactionItemProps> = ({
  date,
  name,
  type,
  amount,
  onDelete,
  id,
}) => {
  const isDeleteTransactionLoading = useAppSelector(
    selectDeleteTransactionLoading,
  );
  const dispatch = useAppDispatch();

  return (
    <div
      className={
        "border border-1 rounded-2 mt-3 p-3 d-flex justify-content-between align-items-center fs-3 "
      }
    >
      <span className={"ms-2 fs-3 text-secondary "}>
        {dayjs(date).format("DD.MM.YYYY HH:mm:ss")}
      </span>
      <span className={"ms-2 fs-3 ms-5 "}>{name}</span>
      <span className={"ms-auto"}>
        {type === "expense" ? `- ${amount}` : `+ ${amount}`}
      </span>
      <div className="me-3">
        <button
          type="button"
          onClick={() => dispatch(changeIsTransactionEdit(id))}
          className="d-inline-block mb-2 button-edit buttons-ic "
        ></button>
        <button
          type="button"
          onClick={onDelete}
          className="d-inline-block button-reset buttons-ic d-flex align-items-center pe-4"
          disabled={isDeleteTransactionLoading}
        >
          {isDeleteTransactionLoading ? (
            <div className={"ms-5 ps-2"}>
              <Spinner />
            </div>
          ) : null}
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;
