import { createAsyncThunk } from "@reduxjs/toolkit";
import { IContact, IContactsList, IForm } from "../../types";
import axiosApi from "../../axiosAPI.ts";

// export const fetchAllContacts = createAsyncThunk<IContact[], void>(
//   "contacts/fetchAllContacts",
//   async () => {
//     const response: { data: IContactsList | null } =
//       await axiosApi("contacts.json");
//     const contactsList = response.data;
//     if (contactsList === null) {
//       return [];
//     }
//     const contacts: IContactsList = contactsList;
//
//     return Object.keys(contactsList).map((contact) => {
//       return {
//         ...contacts[contact],
//         id: contact,
//       };
//     });
//   },
// );

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
