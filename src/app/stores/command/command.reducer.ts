import { createReducer, on } from "@ngrx/store";
import { ICommand } from "./model/ICommand";
import { addAction, clearAction, getAction, removeAction } from "./command.actions";


export const initialState: ICommand = {
   123: {
      command: "ON",
      name: "Turn on",
   },
   234: {
      command: "OFF",
      name: "Turn off",
   }
};

export const commandReducer = createReducer(
   initialState,
   on(getAction, (state): ICommand => state),
   on(clearAction, (): any => {}),
   on(addAction, (state, { command }): ICommand =>  ({...state, ...command})), 
   on(removeAction, (state, { id }): ICommand => {
      const { [id]: removedItem, ...rest } = state;
      return rest;
   }),
); 