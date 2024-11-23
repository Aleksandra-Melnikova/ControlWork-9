export interface IForm {
  category: string;
  name: string;
}
export interface ICategory{
  category: string;
  name: string;
  id: string;
}
export interface ICategoryList {
  [id: string]: IForm;
}