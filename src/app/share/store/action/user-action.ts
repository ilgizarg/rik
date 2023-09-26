import {createAction, props} from "@ngrx/store";
import {UserListInterface} from "../../interface/user-list";


export const UserAction = createAction(
  '[User] get')

export const UserActionSuccess = createAction(
  '[User] response]',
  props<{userList: UserListInterface}>()
)

export const UserActionFailure = createAction(
  '[User] failure]',
  props<{error: string}>()
)
