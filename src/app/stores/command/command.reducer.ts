import { createReducer, on } from "@ngrx/store";
import { ICommand } from "./model/ICommand";
import { addAction, clearAction, getAction, removeAction } from "./command.actions";


export const initialState: ICommand = {
   123: {
      command: "Switch on the smart socket",
      name: "Switch on the smart socket"
   },
   234: {
      command: "Switch off the smart socket",
      name: "Switch off the smart socket"
   }
};

export const commandReducer = createReducer(
   initialState,
   on(getAction, (state): ICommand => state),
   on(clearAction, (): any => {}),
   on(addAction, (state, newState): ICommand => ({...state, ...newState})), 
   on(removeAction, (state, { id }): ICommand => {
      const { [id]: removedItem, ...rest } = state;
      return rest;
   }),
); 