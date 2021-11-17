import { AxiosResponse } from 'axios'
import { BASE_URL } from 'app/configs'
import httpClient from './base-service'
import { IPostFetchData } from 'app/utility/interface/post-data'

export const GetPostsData = (
  page: number
): Promise<AxiosResponse<IPostFetchData>> =>
  httpClient.get(`${BASE_URL}?tags=story&page=${page}`)
