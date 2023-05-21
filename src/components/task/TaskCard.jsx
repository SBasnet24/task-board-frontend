import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const TaskCard = ({ task }) => {
  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title>{task.text}</Card.Title>
      </Card.Body>
    </Card>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }),
};

export default TaskCard;
