import { createReducer, on } from "@ngrx/store";
import { IDevice } from "./model/IDevice";
import { addAction, clearAction, removeAction, statusAction, loadDevicesSuccess } from "./device.actions";

export const initialState: IDevice = {}

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
    }),
    on(loadDevicesSuccess, (state, {devices}): IDevice => devices.reduce((acc: any, {id, ...device}: any): IDevice => ({
        ...acc,
        [id]: device,
    }), {}
    ))
);