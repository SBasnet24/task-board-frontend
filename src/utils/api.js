import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8848/api', // Set your API base URL here
});

export default api;
