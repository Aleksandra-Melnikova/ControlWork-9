import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICategory, ICategoryList, IForm } from '../../types';
import axiosApi from "../../axiosAPI.ts";

export const fetchAllCategory = createAsyncThunk<ICategory[], void>(
  "category/fetchAllCategory",
  async () => {
    const response: { data: ICategoryList | null } =
      await axiosApi("categories.json");
    const categoryList = response.data;
    if (categoryList=== null) {
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

// export const deleteOneContact = createAsyncThunk<void, string>(
//   "contacts/deleteOneContact",
//   async (contactId: string) => {
//     await axiosApi.delete(`contacts/${contactId}.json`);
//   },
// );

export const createCategory = createAsyncThunk<void, IForm>(
  "category/createCategory",
  async (form) => {
    await axiosApi.post("categories.json", { ...form });
  },
);

// export const getOneContactById = createAsyncThunk<IForm | null, string>(
//   "contacts/getOneContactById",
//   async (contactId) => {
//     const response = await axiosApi<IContact | null>(
//       `contacts/${contactId}.json`,
//     );
//     return response.data || null;
//   },
// );
// export const editContact = createAsyncThunk<
//   void,
//   { contactId: string; contact: IForm }
// >("contacts/ editContact", async ({ contactId, contact }) => {
//   await axiosApi.put(`contacts/${contactId}.json`, { ...contact });
// });
