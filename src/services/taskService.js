import api from './api';

export const fetchTasksApi = async () => {
  const response = await api.get('/todos');

  return response.data;
};