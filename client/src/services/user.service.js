import { authHeader } from '../components/Utilities/auth-header';
import axios from 'axios'
import config from '../config/urls'

const host = process.env.NODE_ENV === 'development' ? config.devServer : config.server

export const login = (username, password) => axios.post(`${host}/login`,{ username, password })

export const loginWithToken = (token) => axios.post(`${host}/login/${token}`)

export const verify = (token) => axios.post(`${host}/data/verify?token=${token}`)

export const logout = () => localStorage.removeItem('treatme');

export const forgotPassword = (username) => axios.post(`${host}/data/forgotPassword?username=${username}`)

export const getLoginPageData = (localeId) => axios.get(`${host}/data/login?localeId=${localeId}`)

export const getRegisterPageData = () => axios.get(`${host}/data/register`)

export const getViewPageData = (localeId,username) => axios.get(`${host}/data/view?localeId=${localeId}&username=${username}`)

export const getEditPageData = (localeId) => axios.get(`${host}/data/edit?localeId=${localeId}`, { headers: authHeader() })

export const update = (data,localeId) => axios.put(`${host}/data/update?localeId=${localeId}`, data , { headers: authHeader() })

export const getSpecialities = (mainSpecialityId,localeId) => axios.post(`${host}/data/specialities?localeId=${localeId}`, mainSpecialityId)

export const getLocales = () => axios.get(`${host}/data/locales`)

export const getTranslations = (localeId) => axios.get(`${host}/data/translations?localeId=${localeId}`)

export const register = (user,localeId) => axios.post(`${host}/register?localeId=${localeId}`, user)

export const contactSupport = (message) => axios.post(`${host}/data/contact`, {message} , { headers: authHeader() })

