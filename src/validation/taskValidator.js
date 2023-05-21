const validateTask = (text) => {
  // Add your task validation logic here
  if (text.trim() === '') {
    throw new Error('Task text cannot be empty');
  }
};

export default validateTask;
