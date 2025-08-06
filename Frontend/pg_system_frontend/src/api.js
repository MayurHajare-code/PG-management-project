import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080', // Spring Boot backend URL
  withCredentials: true, // 🔥 Enables cookies for session
});

export default API;


