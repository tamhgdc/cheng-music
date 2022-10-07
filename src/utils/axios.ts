import axios, { AxiosRequestConfig, ResponseType, AxiosInstance } from 'axios'
import { message as Message } from 'antd'
import { SERVER } from '../constants/server'

const TIMEOUT = 40000

const serverAddr = import.meta.env.MODE === 'development' ? '' : 'music'

interface IDictionary<T> {
    [key: string]: T
}

// eslint-disable-next-line no-undef
const MIME_TYPE: IDictionary<ResponseType> = {
    JSON: 'json',
}

const createInstance = () => {
    const instance = axios.create({
        baseURL: SERVER + serverAddr,
        withCredentials: true,
        timeout: TIMEOUT,
        responseType: MIME_TYPE.JSON,
    })

    instance.interceptors.response.use(handleResponse, handleError)

    return instance
}

const handleResponse = (response: any) => response.data

const handleError = (error: any) => {
    const { response, message } = error
    return Promise.reject(response ? new Error(response.data.message || message) : error)
}

const toastError = (error: any) => {
    const { response, message } = error
    Message.error(response?.data?.message || message)

    return Promise.reject(error)
}

interface Instance extends AxiosInstance {
    // eslint-disable-next-line no-unused-vars
    (config: AxiosRequestConfig): Promise<any>
}

export const requestWithoutErrorToast: Instance = createInstance()

const request: Instance = createInstance()

request.interceptors.response.use((res:any):any => {
    if (res.code !== 200) {
        Message.error(res?.data?.message || '请求错误')
    }
    return res
}, toastError)

export default request
