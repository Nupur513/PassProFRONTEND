// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3500/api', // Adjust the URL as per your backend setup
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
