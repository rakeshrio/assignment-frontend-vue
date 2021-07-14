import axios from 'axios'

const baseDomain = 'http://localhost:3000'


const baseURL = `${baseDomain}/api`


export const HTTP = axios.create({
  baseURL: baseURL

})
