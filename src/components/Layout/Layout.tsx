import React, { PropsWithChildren } from "react";
import ToolBar from "../ToolBar/ToolBar.tsx";
import { useAppDispatch } from "../../app/hooks.ts";
import { changeTransactionShowModal } from "../../store/slices/TransactionsSlice.ts";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <header>
        <ToolBar openModal={() => dispatch(changeTransactionShowModal())} />
      </header>
      <main className="container mt-4">{children}</main>
    </>
  );
};

export default Layout;
