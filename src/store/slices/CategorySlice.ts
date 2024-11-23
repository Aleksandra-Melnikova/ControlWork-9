import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  createCategory,
  deleteOneCategory,
  editCategory,
  fetchAllCategory,
  getOneCategoryById,
} from "../thunks/categoryThunk.ts";
import { RootState } from "../../app/store.ts";
import { ICategory, IForm } from "../../types";

interface CategoryState {
  isAddLoading: boolean;
  showModal: boolean;
  categories: ICategory[];
  oneCategory: IForm | null;
  isFetchLoading: boolean;
  isDeleteLoading: boolean;
  isEditLoading: boolean;
  isFetchOneLoading: boolean;
  isEdit: boolean;
  idEdit: string | null;
}

const initialState: CategoryState = {
  isAddLoading: false,
  showModal: false,
  categories: [],
  oneCategory: null,
  isFetchLoading: false,
  isDeleteLoading: false,
  isEditLoading: false,
  isFetchOneLoading: false,
  isEdit: false,
  idEdit: null,
};
export const selectAddLoading = (state: RootState) =>
  state.category.isAddLoading;
export const selectShowModal = (state: RootState) => state.category.showModal;
export const selectCategories = (state: RootState) => state.category.categories;
export const selectFetchLoading = (state: RootState) =>
  state.category.isFetchLoading;
export const selectDeleteLoading = (state: RootState) =>
  state.category.isDeleteLoading;
export const selectOneCategory = (state: RootState) =>
  state.category.oneCategory;
export const selectEditLoading = (state: RootState) =>
  state.category.isEditLoading;
export const selectEdit = (state: RootState) => state.category.isEdit;
export const selectIdEdit = (state: RootState) => state.category.idEdit;

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    changeShowModal: (state) => {
      state.showModal = !state.showModal;
    },
    changeIsEdit: (state, action: PayloadAction<string>) => {
      state.isEdit = !state.isEdit;
      state.showModal = !state.showModal;
      state.idEdit = action.payload;
      if (!state.showModal) {
        state.idEdit = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.isAddLoading = true;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.isAddLoading = false;
      })
      .addCase(createCategory.rejected, (state) => {
        state.isAddLoading = false;
      })
      .addCase(fetchAllCategory.pending, (state) => {
        state.isFetchLoading = true;
      })
      .addCase(
        fetchAllCategory.fulfilled,
        (state, action: PayloadAction<ICategory[]>) => {
          state.isFetchLoading = false;
          state.categories = action.payload;
        },
      )
      .addCase(fetchAllCategory.rejected, (state) => {
        state.isFetchLoading = false;
      })
      .addCase(deleteOneCategory.pending, (state) => {
        state.isDeleteLoading = true;
      })
      .addCase(deleteOneCategory.fulfilled, (state) => {
        state.isDeleteLoading = false;
      })
      .addCase(deleteOneCategory.rejected, (state) => {
        state.isDeleteLoading = false;
      })
      .addCase(getOneCategoryById.pending, (state) => {
        state.isFetchOneLoading = true;
        state.oneCategory = null;
      })
      .addCase(
        getOneCategoryById.fulfilled,
        (state, action: PayloadAction<IForm | null>) => {
          state.isFetchOneLoading = false;
          state.oneCategory = action.payload;
        },
      )
      .addCase(getOneCategoryById.rejected, (state) => {
        state.isFetchOneLoading = false;
      })
      .addCase(editCategory.pending, (state) => {
        state.isEditLoading = true;
      })
      .addCase(editCategory.fulfilled, (state) => {
        state.isEditLoading = false;
        state.oneCategory = null;
      })
      .addCase(editCategory.rejected, (state) => {
        state.isEditLoading = false;
      });
  },
});
export const categoryReducer = categorySlice.reducer;
export const { changeShowModal, changeIsEdit } = categorySlice.actions;
