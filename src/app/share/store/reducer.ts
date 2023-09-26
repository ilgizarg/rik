import {UserListInterface} from "../interface/user-list";
import {createReducer, on} from "@ngrx/store";
import { UserAction, UserActionFailure, UserActionSuccess} from "./action/user-action";

export interface stateInitial {
  loading?: boolean;
  userList: UserListInterface | null;
  backEndError?: string
}

const initialState: stateInitial = {
  loading: false,
  userList: null
}

export const UserReducer = createReducer(
  initialState,
  on(UserAction, (state): stateInitial => ({
    ...state,
    loading: true,
    userList: null
  })),
  on(UserActionSuccess, (state, action): stateInitial => ({
    ...state,
    loading: false,
    userList: action.userList
  })),
  on(UserActionFailure, (state, action): stateInitial => ({
    ...state,
    backEndError: action.error

  }))
)
