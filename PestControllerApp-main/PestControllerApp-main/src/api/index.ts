import axios from 'axios'
import * as auth from './auth'
import * as clients from './client'
import * as cloudinary from './cloudinary'
import * as dataupload from './dataupload'
import * as services from './services'
import * as users from './users'
import * as reports from './reports'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_ENDPOINT

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem(process.env.NEXT_PUBLIC_SIGNIN_TOKEN)

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  err => Promise.reject(err)
)

export const api = { auth, clients, cloudinary, dataupload, reports, services, users }
