import { createReducer, on } from "@ngrx/store";
import { IDevice } from "./model/IDevice";
import { addAction, clearAction, removeAction, statusAction } from "./device.actions";

export const initialState: IDevice = {
    123: {
        name: "tasmota_A06894",
        topic: 'tasmota_A06894',
        type: "smartsocket",
        status: "OFF",
    }
}

export const deviceReducer = createReducer(
    initialState,
    on(addAction, (state, { device }): IDevice => ({...state, ...device})),
    on(statusAction, (state, { id, status }): IDevice => {
        return {
            ...state,
            [id]: {
                ...state[id],
                status: status
            }
        }
    }),
    on(clearAction, (): any => {}),
    on(removeAction, (state, { id }): IDevice => {
        const { [id]: removedItem, ...rest } = state;
        return rest;
    })
);