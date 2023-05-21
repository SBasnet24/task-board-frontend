import { Alert } from 'react-bootstrap';
import { PropTypes } from 'prop-types';

const ErrorMessage = ({ error }) => <Alert variant="danger">{error.message}</Alert>;

ErrorMessage.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};

export default ErrorMessage;
