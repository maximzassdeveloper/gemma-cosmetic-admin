import authAxios from './authAxios'

type fetchType = 'get' | 'post' | 'delete' | 'put'

interface FetchDataProps {
  url: string,
  type?: fetchType,
  data?: any
}

export const fetchData = async ({ url, type = 'get', data }: FetchDataProps): Promise<any> => {
  try {
    switch(type) {
      case 'get':
        return (await authAxios.get(url)).data
      case 'post':
        return (await authAxios.post(url, data)).data
      case 'put':
        return (await authAxios.put(url, data)).data
      case 'delete':
        return (await authAxios.delete(url)).data
    }
  } catch(e) {
    console.log(e)
    return null
  }
}