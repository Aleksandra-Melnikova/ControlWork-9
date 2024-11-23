export interface IForm {
  category: string;
  name: string;
}
export interface ICategory {
  category: string;
  name: string;
  id: string;
}
export interface ICategoryList {
  [id: string]: IForm;
}
export interface ITransactionForm {
  type: string;
  category: string;
  amount: number;
}
export interface ITransactionFormForBase extends ITransactionForm {
  date: string;
}
export interface ITransaction {
  category: string;
  amount: number;
  id: string;
  date: string;
}
export interface ITransactionList {
  [id: string]: ITransaction;
}
export interface IFormTransaction {
  category: string;
  amount: number;
  date: string;
}
export interface IArray {
  name: string;
  type: string;
  amount: number;
  id: string;
  date: string;
}
