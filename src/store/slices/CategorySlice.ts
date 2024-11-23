
import { createSlice, PayloadAction, } from '@reduxjs/toolkit';

import { createCategory, fetchAllCategory } from '../thunks/categoryThunk.ts';
import { RootState } from '../../app/store.ts';
import { ICategory } from '../../types';

interface CartState {
isAddLoading: boolean;
showModal: boolean;
categories: ICategory[];
isFetchLoading: boolean;
}

const initialState: CartState = {
 isAddLoading: false,
  showModal: false,
  categories:[],
  isFetchLoading: false,
};
export const selectAddLoading = (state: RootState) => state.category.isAddLoading;
export const selectShowModal = (state: RootState) => state.category.showModal;
export const selectCategories = (state: RootState) => state.category.categories;
export const selectFetchLoading = (state: RootState) => state.category.isFetchLoading;
// export const selectOrderLoading = (state: RootState) =>
//   state.cart.isOrderLoading;
// export const selectOrdersAdminLoading = (state: RootState) =>
//   state.cart.isOrdersAdminLoading;
// export const selectDeleteOrderLoading = (state: RootState) =>
//   state.cart.isDeleteOrderLoading;
// export const selectOrders = (state: RootState) => state.cart.ordersPizza;
// export const selectOrdersAdmin = (state: RootState) => state.cart.ordersAdmin;
// export const selectCartDishes = (state: RootState) => state.cart.cartDishes;

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    changeShowModal: (state) => {
      state.showModal = !state.showModal;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.isAddLoading = true;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.isAddLoading  = false;
      })
      .addCase(createCategory.rejected, (state) => {
        state.isAddLoading  = false;
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
      // .addCase(fetchAllOrders.pending, (state) => {
      //   state.isOrdersAdminLoading = true;
      // })
      // .addCase(
      //   fetchAllOrders.fulfilled,
      //   (state, action: PayloadAction<IOrdersFromApi | null>) => {
      //     state.isOrdersAdminLoading = false;
      //     if (action.payload) {
      //       const postResponseNew = Object.entries(action.payload);
      //       const array: IOrdersFromApi[] = [];
      //       for (let i = 0; i < postResponseNew.length; i++) {
      //         const obj: IOrdersFromApi = {
      //           id: postResponseNew[i][0],
      //           objOrders: postResponseNew[i][1],
      //         };
      //         array.push(obj);
      //       }
      //       state.ordersAdmin = array;
      //     }
      //   },
      // )
      // .addCase(fetchAllOrders.rejected, (state) => {
      //   state.isOrdersAdminLoading = false;
      // })
      // .addCase(deleteOneOrderItem.pending, (state) => {
      //   state.isDeleteOrderLoading = true;
      // })
      // .addCase(deleteOneOrderItem.fulfilled, (state) => {
      //   state.isDeleteOrderLoading = false;
      // })
      // .addCase(deleteOneOrderItem.rejected, (state) => {
      //   state.isDeleteOrderLoading = false;
      // });
  },
});
export const categoryReducer = categorySlice.reducer;
export const {changeShowModal } = categorySlice.actions;
