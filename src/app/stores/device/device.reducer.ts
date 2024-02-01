import { createReducer, on } from "@ngrx/store";
import { IDevice } from "./model/IDevice";
import { addAction, clearAction, removeAction } from "./device.actions";

export const initialState: IDevice = {
    123: {
        name: "tasmota_A06894",
        topic: 'tasmota_A06894',
        type: "smart_socket",
    }
}

export const deviceReducer = createReducer(
    initialState,
    on(addAction, (state, { device }): IDevice => ({...state, ...device})),
    on(clearAction, (): any => {}),
    on(removeAction, (state, { id }): IDevice => {
        const { [id]: removedItem, ...rest } = state;
        return rest;
    })
)