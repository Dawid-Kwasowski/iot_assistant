import { createAction, props } from '@ngrx/store';
import { ICommand } from './model/ICommand';


export const addAction = createAction('[Command List] Add', props<ICommand>());

export const removeAction = createAction('[Command List] Remove', props<{ id: string | number }>());

export const getAction = createAction('[Command List] Get');

export const clearAction = createAction('[Command List] Clear');
