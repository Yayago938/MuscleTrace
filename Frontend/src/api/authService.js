import api from './api'

export const loginUser = ({ email, password }) => {
  return api.post('/api/auth/login', { email, password })
}

export const registerUser = ({ name, email, password }) => {
  return api.post('/api/auth/register', { name, email, password })
}