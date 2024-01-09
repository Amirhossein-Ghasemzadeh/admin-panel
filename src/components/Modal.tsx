import {Box, CircularProgress} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';

import {useConsumeContext} from '../context/UserContext';
import AddOrEditUser from './AddOrEditUser/AddOrEditUser';

export default function DraggableDialog() {
  const {isOpenModal, handleCloseModal, mode, loading} = useConsumeContext();

  return (
    <div>
      <Dialog open={isOpenModal} onClose={handleCloseModal}>
        <DialogTitle sx={{display: 'flex', alignItems: 'center'}}>
          <Box sx={{width: '100%'}}>
            <p style={{textAlign: 'center', fontWeight: '700'}}>
              {mode === 'edit' ? 'Edit User' : 'Add New User'}
            </p>
          </Box>
          <CloseIcon
            onClick={handleCloseModal}
            sx={{
              color: '#ee5151',
              position: 'absolute',
              right: '20px',
              cursor: 'pointer',
            }}
          />
        </DialogTitle>
        <DialogContent>
          {mode === 'edit' && loading ? (
            <Box
              sx={{
                height: '250px',
                width: '250px',
                display: 'grid',
                placeItems: 'center',
              }}>
              <CircularProgress color='secondary' />
            </Box>
          ) : (
            <AddOrEditUser />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
