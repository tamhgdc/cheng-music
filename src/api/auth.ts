import axios from '../utils/axios'
import { ILoginRequest, ILoginResult } from './types/auth'

type LoginFn = (params:ILoginRequest) => Promise<ILoginResult>

const login: LoginFn = ({ phone, password }) => axios({
        url: '/login/cellphone',
        params: {
          phone,
          password,
        },
      })

const logout = () => axios({
        method: 'post',
        url: '/logout',
})

export default {
  login,
  logout,
}
