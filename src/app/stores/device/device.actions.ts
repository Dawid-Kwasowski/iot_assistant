import { IDevice } from './model/IDevice';
import { createAction, props } from "@ngrx/store";

export const addDevices = createAction('[Device List] Insert');
export const addAction = createAction('[Device List] Add', props<{ device: IDevice }>());


export const removeAction = createAction('[Device List] Remove', props<{id: string | number}>());
export const clearAction = createAction('[Device List] Clear');
export const statusAction = createAction('[Device List] Status', props<{id: string | number; status: string}>());

export const loadDevices = createAction('[Data] Load Data');
export const loadDevicesSuccess = createAction('[Data] Load Data Success', props<{ devices: any }>());
export const loadDevicesFailure = createAction('[Data] Load Data Failure', props<{ error: any }>());