export type UserRoles = 'USER' | 'ADMIN'

export interface IUser {
  id: number
  name: string
  surname?: string
  fullName: string
  email: string
  phone?: string
  role: UserRoles
}

export interface LoginResponse {
  user: IUser
  accessToken: string
  refreshToken: string
}