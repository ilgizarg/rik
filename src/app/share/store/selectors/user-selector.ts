import {stateInitial} from "../reducer";
import {createFeatureSelector} from "@ngrx/store";

export class AppState implements stateInitial{
  loading = false;
  userList = null;
  backEndError = '';
}

export const selectState = (state: AppState) => state;
export const userListSelector = createFeatureSelector<AppState>('userList')
export const loadingSelector = createFeatureSelector<AppState>('loading')
export const backendErrorSelector = createFeatureSelector<AppState>('backEndError')
