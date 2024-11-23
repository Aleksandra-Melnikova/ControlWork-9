import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICategory, ICategoryList, IForm } from "../../types";
import axiosApi from "../../axiosAPI.ts";

export const fetchAllCategory = createAsyncThunk<ICategory[], void>(
  "category/fetchAllCategory",
  async () => {
    const response: { data: ICategoryList | null } =
      await axiosApi("categories.json");
    const categoryList = response.data;
    if (categoryList === null) {
      return [];
    }
    const categories: ICategoryList = categoryList;

    return Object.keys(categoryList).map((category) => {
      return {
        ...categories[category],
        id: category,
      };
    });
  },
);

export const deleteOneCategory = createAsyncThunk<void, string>(
  "category/deleteOneCategory",
  async (categoryId: string) => {
    await axiosApi.delete(`categories/${categoryId}.json`);
  },
);

export const createCategory = createAsyncThunk<void, IForm>(
  "category/createCategory",
  async (form) => {
    await axiosApi.post("categories.json", { ...form });
  },
);

export const getOneCategoryById = createAsyncThunk<IForm | null, string>(
  "category/getOneCategoryById ",
  async (categoryId) => {
    const response = await axiosApi<ICategory | null>(
      `categories/${categoryId}.json`,
    );
    return response.data || null;
  },
);
export const editCategory = createAsyncThunk<
  void,
  { categoryId: string; category: IForm }
>("category/editCategory", async ({ categoryId, category }) => {
  await axiosApi.put(`categories/${categoryId}.json`, { ...category });
});
