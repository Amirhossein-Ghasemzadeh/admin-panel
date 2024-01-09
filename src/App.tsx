import {Container} from '@mui/material';
import Modal from './components/Modal';
import UserTable from './components/UserTable/UserTable';
import UserContext from './context/UserContext';

const App = () => {
  return (
    <Container maxWidth='md'>
      <UserContext>
        <Modal />
        <UserTable />
      </UserContext>
    </Container>
  );
};

export default App;
