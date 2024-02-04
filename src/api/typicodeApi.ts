import axios, { AxiosInstance } from 'axios'
import { CommentType, PostType } from '@/types'

const instance: AxiosInstance = axios.create({
  baseURL: `https://jsonplaceholder.typicode.com/`,
})

const typicodeApi = {
  async getPosts() {
    const response = await instance
    .get<PostType[]>(`posts`)
    return response.data
  },
  async getComments() {
    const response = await instance
    .get<CommentType[]>(`comments`)
    return response.data
  },
};

export default typicodeApi;