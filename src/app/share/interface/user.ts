export interface UserInterface {
  id: number,
  name: string,
  email: string,
  phone: number,
  create_at: number,
  update_at: number
}


export interface UserTableInterface {
  id: number,
  name: string,
  email: string,
  phone: number,
  create_at: number,
  update_at: number,
  user_id: number,
  is_admin: boolean,
  is_ecp: boolean,
  status: string
}