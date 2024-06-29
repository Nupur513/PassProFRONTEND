// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Adjust the URL as per your backend setup
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
