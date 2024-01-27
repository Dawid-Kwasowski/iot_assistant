import { createReducer, on } from "@ngrx/store";
import { IUser } from "./model/IUser";
import { retrieveAction, updateAction, clearAction } from "./user.actions";

export const initialState: IUser = {
   email: "",
   username: "",
}

export const userReducer = createReducer(
   initialState,
   on(retrieveAction, (state): IUser => ({ ...state })),
   on(updateAction, (state, { email, username} ): IUser => ({ ...state, email, username })),
   on(clearAction, (state): IUser => ({ ...state, email: "", username: "" })),
);