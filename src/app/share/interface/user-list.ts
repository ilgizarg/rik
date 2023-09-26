import {UserInterface} from "./user";


export interface userDataInterface {
    user_id: number,
    is_admin: boolean,
    is_ecp: boolean,
    status: string
}
export interface UserListInterface {
  page: {
    total: number,
    current: number,
    size: number
  } | null,
  users: UserInterface[] | null ,
  data: userDataInterface[] 
}

