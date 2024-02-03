import { createReducer, on } from "@ngrx/store";
import { ICommand } from "./model/ICommand";
import { addAction, clearAction, removeAction } from "./command.actions";


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
   on(clearAction, (state): any => state = {}),
   on(addAction, (state, { command }): ICommand =>  ({...state, ...command})), 
   on(removeAction, (state, { id }): ICommand => {
      const { [id]: removedItem, ...rest } = state;
      return rest;
   }),
); 