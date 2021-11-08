import axios from 'axios'
import { SERVER_URL, TOKEN_NAME } from '../helper/config'


export const BASE_URL = `${SERVER_URL}/api`

const authAxios = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
})

authAxios.interceptors.request.use(config => {
  if (!config || !config.headers) return
  config.headers.Authorization = `Bearer ${localStorage.getItem(TOKEN_NAME) || ''}`
  return config
})

export default authAxios