import {stateInitial} from "../reducer";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export const userListFeatureSelector = createFeatureSelector<stateInitial>('userList')

export const userListSelector = createSelector(userListFeatureSelector, (userList: stateInitial) => userList.userList);
export const loadingSelector = createSelector(userListFeatureSelector, (userList: stateInitial) => userList.loading);
export const backEndErrorSelector = createSelector(userListFeatureSelector, (userList: stateInitial) => userList.backEndError);

