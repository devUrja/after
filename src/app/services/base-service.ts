import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { HttpStatusCodes } from 'app/utility/enums/http-status-codes'
import { hideLoader, showLoader } from 'app/utility/helper'
import {
  SOMETHING_WENT_WRONG,
  INTERNAL_SERVER_ERROR,
} from 'app/utility/constants'

declare module 'axios' {
  export interface AxiosRequestConfig {
    hideLoader?: boolean
  }
}

axios.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    if (!config.hideLoader) {
      showLoader()
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    hideLoader()
    return response
  },
  (error: AxiosError) => {
    const expectedError =
      error.response &&
      error.response.status >= HttpStatusCodes.BadRequest &&
      error.response.status < HttpStatusCodes.InternalServerError

    if (expectedError) {
      if (!error.response?.data?.success && error.response?.data?.message) {
        toast.error(INTERNAL_SERVER_ERROR)
      }
    } else {
      toast.error(SOMETHING_WENT_WRONG)
    }
    hideLoader()

    return Promise.reject(error)
  }
)

export default {
  post: axios.post,
  get: axios.get,
}
