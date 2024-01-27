import { createAction, props } from '@ngrx/store';

export const updateAction = createAction('[User Page] Login', props<{ email: string; username: string }>());

export const clearAction = createAction('[User Page] Logout');

export const retrieveAction = createAction('[User Page] Retrieve');