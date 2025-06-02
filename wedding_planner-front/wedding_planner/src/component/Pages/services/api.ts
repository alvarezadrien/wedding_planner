import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchTaskLists = (weddingId) => {
  return axios.get(`${API_URL}/tasks/${weddingId}`, {
    headers: getAuthHeaders(),
  });
};

export const createTaskList = (data) => {
  return axios.post(`${API_URL}/tasks`, data, {
    headers: getAuthHeaders(),
  });
};
