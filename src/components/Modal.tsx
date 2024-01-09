import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, {PaperProps} from '@mui/material/Paper';
import Draggable from 'react-draggable';
import {useConsumeContext} from '../context/UserContext';
import AddOrEditUser from './AddOrEditUser/AddOrEditUser';

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle='#draggable-dialog-title'
      cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog() {
  const {isOpenModal, handleCloseModal, mode, loading} = useConsumeContext();

  return (
    <div>
      <Dialog
        open={isOpenModal}
        onClose={handleCloseModal}
        PaperComponent={PaperComponent}
        aria-labelledby='draggable-dialog-title'>
        <DialogTitle style={{cursor: 'move'}} id='draggable-dialog-title'>
          Add New User
        </DialogTitle>
        <DialogContent style={{padding: 4}}>
          {mode === 'edit' && loading ? 'Loading ...' : <AddOrEditUser />}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseModal}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
