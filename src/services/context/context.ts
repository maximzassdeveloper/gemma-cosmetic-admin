import { createContext } from 'react'
import { IUser } from '../../types/user'

interface AuthState {
  user: IUser | null,
  isAuth: boolean,
  loading: Boolean,
  error: string,
  login: (data: any) => void,
  logout: () => void,
  refresh: () => void,
}

export const authContext = createContext<AuthState>({
  user: null,
  isAuth: false,
  loading: true,
  error: '',
  login: () => null,
  refresh: () => null,
  logout: () => null
})
