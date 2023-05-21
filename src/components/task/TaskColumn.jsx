import { Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import TaskCard from './TaskCard';

const TaskColumn = ({ tasks, droppableId }) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <TaskCard task={task} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

TaskColumn.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      position: PropTypes.number.isRequired,
    })
  ).isRequired,
  droppableId: PropTypes.string.isRequired,
};

export default TaskColumn;
