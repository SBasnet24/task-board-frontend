import { useCallback } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import useTextInput from '../../hooks/common/useTextInput';

const TaskForm = ({ addTask }) => {
  const { text, handleChange, reset } = useTextInput();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      addTask(text);
      reset();
    },
    [addTask, text, reset]
  );

  return (
    <Form
      onSubmit={handleSubmit}
      className="d-flex justify-content-center mt-4 container mb-5"
    >
      <Form.Group className="d-flex w-100 me-3 align-items-baseline max-width-form">
        <Form.Label className="min-width-label">Add Task</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter text"
          value={text}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

TaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default TaskForm;
