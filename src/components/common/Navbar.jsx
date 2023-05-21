import { Container, Navbar } from 'react-bootstrap';

const { Brand } = { ...Navbar };
const NavbarComp = () => {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Brand href="/leagues">Task Boards</Brand>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
