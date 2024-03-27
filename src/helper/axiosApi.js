import axios from 'axios'
import { isUserLoggedIn, getAccessToken, userLogout } from './authFunctions'

const baseURL = process.env.REACT_APP_API_ENDPOINT

export const axiosApi = axios.create({ baseURL: `${baseURL}api/v1/` })

axiosApi.defaults.headers['Access-Control-Allow-Origin'] = '*'

export function changeLangauge(lang) {
  axiosApi.defaults.headers.common["Accept-Language"] = lang
}

if (isUserLoggedIn) {
  axiosApi.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${getAccessToken()}`
  axiosApi.defaults.headers.get["Content-Type"] = "application/json"
}

// axiosApi.interceptors.request.use(
//   (request) => {
//     request.headers.common[
//       "Authorization"
//     ] = `Bearer ${getAccessToken()}`
//     return request
//   }, (error) => {
//     Promise.reject(error)
//   }
// )

axiosApi.interceptors.response.use((response) => {
  return response
}, (error) => {
  const resposneStatus = error?.response?.status
  switch (resposneStatus) {
    case 401:
      userLogout()
      window.location.href = '/login'
      break

    default:
      throw error
      break
  }
})