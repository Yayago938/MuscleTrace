import axios from 'axios'
const BASE_URL='https://muscletrace-backend.onrender.com/'
const api=axios.create({
    baseURL:BASE_URL
})
export default api;