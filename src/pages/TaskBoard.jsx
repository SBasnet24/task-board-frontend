import { Container, Row, Col } from 'react-bootstrap';
import { DragDropContext } from 'react-beautiful-dnd';

import TaskForm from '../components/task/TaskForm';
import TaskColumn from '../components/task/TaskColumn';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { TaskStatus } from '../utils/taskStatus';
import useTextInput from '../hooks/common/useTextInput';
import useTaskColumn from '../hooks/tasks/useTaskColumn';
import useTasks from '../hooks/tasks/useTasks';

const TaskBoard = () => {
  const { tasks, isLoading, isError, queryError, error, addTask, handleDragEnd } =
    useTasks();
  const { text, handleTextChange } = useTextInput();
  const { columnTasks: todoTasks } = useTaskColumn(tasks || [], TaskStatus.TODO);
  const { columnTasks: inProgressTasks } = useTaskColumn(
    tasks || [],
    TaskStatus.IN_PROGRESS
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage error={queryError} />;
  }

  return (
    <Container>
      <TaskForm text={text} handleTextChange={handleTextChange} addTask={addTask} />
      {error ? <ErrorMessage error={error} /> : null}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Row>
          <Col>
            <h2>Todo</h2>
            <TaskColumn tasks={todoTasks} droppableId={TaskStatus.TODO} />
          </Col>
          <Col>
            <h2>In Progress</h2>
            <TaskColumn tasks={inProgressTasks} droppableId={TaskStatus.IN_PROGRESS} />
          </Col>
        </Row>
      </DragDropContext>
    </Container>
  );
};

export default TaskBoard;
