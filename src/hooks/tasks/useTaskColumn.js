const useTaskColumn = (tasks, column) => {
  const columnTasks = tasks.filter((task) => task.status === column);

  return {
    columnTasks,
  };
};

export default useTaskColumn;
