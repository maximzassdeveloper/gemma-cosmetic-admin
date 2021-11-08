import { FC, useState } from 'react'
import { useHistory } from 'react-router'
import { TOKEN_NAME } from '../../helper/config'
import { IUser, LoginResponse } from '../../types/user'
import authAxios from '../authAxios'
import { authContext } from './context'

export const AuthProvider: FC = ({ children }) => {

  const [user, setUser] = useState<IUser | null>(null)
  const [isAuth, setIsAuth] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const history = useHistory()

  const login = async (formData: any) => {
    try {
      const { data } = await authAxios.post<LoginResponse>('/users/login', formData)
      if (data.user.role !== 'ADMIN') return setError('Недостаточно прав')

      localStorage.setItem(TOKEN_NAME, data.accessToken)
      setUser(data.user)
      setIsAuth(true)

      history.push('/')

    } catch(e) {
      setError('Не удалось войти')
      console.log(e)
    } finally { setLoading(false) }
  }

  const refresh = async () => {
    const token = localStorage.getItem(TOKEN_NAME)
    if (!token) return setLoading(false)

    try {
      const { data } = await authAxios.get<LoginResponse>('/users/refresh')
      if (data.user.role !== 'ADMIN') return

      localStorage.setItem(TOKEN_NAME, data.accessToken)
      setUser(data.user)
      setIsAuth(true)

    } catch(e) {
      console.log(e)
    }
    setLoading(false)
  }

  const logout = async () => {
    try {
      await authAxios.get('/users/logout')
      localStorage.removeItem(TOKEN_NAME)
      setUser(null)
      setIsAuth(false)

    } catch(e) {
      console.log(e)
    }
  }

  return <authContext.Provider value={{
    user, isAuth, loading, error, login, logout, refresh
  }}>
    {children}
  </authContext.Provider>
}