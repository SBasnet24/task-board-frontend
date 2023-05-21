/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  createTask,
  fetchTasks,
  updateTaskPosition,
  moveTaskToDifferentColumn,
} from '../../api/taskApi';
import validateTask from '../../validation/taskValidator';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    error: queryError,
  } = useQuery('tasks', async () => {
    const tasks = await fetchTasks();
    setTasks(tasks);
    return data;
  });

  const handleError = (error) => {
    console.error('Error occurred:', error);
    setError(error);
  };

  const addTaskMutation = useMutation(createTask);

  const addTask = useCallback(
    async (text) => {
      try {
        validateTask(text);
        await addTaskMutation.mutateAsync(text);
        queryClient.invalidateQueries('tasks');
      } catch (error) {
        handleError(error);
      }
    },
    [addTaskMutation, queryClient, handleError]
  );

  const handleDragEnd = useCallback(
    async (result) => {
      if (!result.destination) return;
      const { source, destination } = result;

      try {
        if (source.droppableId === destination.droppableId) {
          handleSameColumnDragEnd(source, destination);
        } else {
          handleDifferentColumnDragEnd(source, destination);
        }
      } catch (error) {
        handleError(error);
      }
    },
    [handleError]
  );

  const handleSameColumnDragEnd = async (source, destination) => {
    try {
      const column = source.droppableId;
      const updatedTasks = [...tasks];

      const columnTasks = getColumnTasks(updatedTasks, column);
      const [movedTask] = columnTasks.splice(source.index, 1);
      columnTasks.splice(destination.index, 0, movedTask);

      const reorderedTasks = updatedTasks.map((task) =>
        task.status === column ? columnTasks.shift() : task
      );

      setTasks(reorderedTasks);

      const movedTaskId = movedTask.id;
      const newPosition = destination.index;

      await updateTaskPosition(movedTaskId, newPosition);
    } catch (error) {
      handleError(error);
    }
  };

  const handleDifferentColumnDragEnd = async (source, destination) => {
    try {
      const updatedTasks = [...tasks];

      const sourceTasks = getColumnTasks(updatedTasks, source.droppableId);
      const destTasks = getColumnTasks(updatedTasks, destination.droppableId);

      const [movedTask] = sourceTasks.splice(source.index, 1);
      movedTask.status = destination.droppableId;
      destTasks.splice(destination.index, 0, movedTask);

      const reorderedTasks = updatedTasks.map((task) =>
        task.status === source.droppableId
          ? sourceTasks.shift()
          : task.status === destination.droppableId
          ? destTasks.shift()
          : task
      );

      setTasks(reorderedTasks);

      const movedTaskId = movedTask.id;
      const newPosition = destination.index;
      const destinationStatus = destination.droppableId;

      // Send API request to update task position and status
      await moveTaskToDifferentColumn(movedTaskId, newPosition, destinationStatus);
    } catch (error) {
      handleError(error);
    }
  };

  const getColumnTasks = (tasks, column) => {
    return tasks.filter((task) => task.status === column);
  };

  return {
    tasks,
    isLoading,
    isError,
    queryError,
    error,
    addTask,
    handleDragEnd,
  };
};

export default useTasks;
