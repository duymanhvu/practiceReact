// import axios from 'axios'
import instance from './customize-axios';
import axios from './customize-axios'

const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`);
    
}

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });


export {fetchAllUser};