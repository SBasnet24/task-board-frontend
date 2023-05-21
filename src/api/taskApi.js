import api from '../utils/api';

const parseApiError = (error) => {
  return (
    (error.response && error.response.data && error.response.data.message) ||
    (error.response &&
      error.response.data &&
      error.response.data.error &&
      error.response.data.error.message) ||
    'An unknown error has occured'
  );
};

const handleApiError = (error) => {
  console.error(error);
  throw new Error(parseApiError(error));
};

export const fetchTasks = async () => {
  try {
    const response = await api.get(`/tasks`);
    return response.data.tasks.map((task) => ({
      ...task,
      id: String(task.id),
    }));
  } catch (error) {
    handleApiError(error);
  }
};

export const createTask = async (text) => {
  try {
    const response = await api.post(`/tasks`, { text });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateTaskPosition = async (taskId, newPosition) => {
  try {
    const response = await api.put(`/tasks/${taskId}/move`, {
      position: newPosition,
    });
    return response.data.task;
  } catch (error) {
    handleApiError(error);
  }
};

export const moveTaskToDifferentColumn = async (taskId, newPosition, newStatus) => {
  try {
    const response = await api.put(`/tasks/${taskId}/move-to-board`, {
      position: newPosition,
      status: newStatus,
    });

    return response.data.task;
  } catch (error) {
    handleApiError(error);
  }
};
