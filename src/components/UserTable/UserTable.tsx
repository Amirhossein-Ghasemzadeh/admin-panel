import React from 'react';
import {Box} from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Button,
  CircularProgress,
  Grid,
  Pagination,
  TextField,
} from '@mui/material';

import {useConsumeContext} from '../../context/UserContext';

const UserTable: React.FC = () => {
  const {
    users,
    handleAddUser,
    handleChange,
    handleEditUser,
    handleDeleteUser,
    pageCount,
    text,
    loading,
    handleTextChange,
  } = useConsumeContext();

  return (
    <Box>
      <Box>
        <Box
          sx={{
            my: '30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TextField label='search' value={text} onChange={handleTextChange} />
          <Button
            sx={{margin: '20px 0'}}
            variant='contained'
            onClick={handleAddUser}>
            Add New User
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{border: '1px solid #b2aaaa'}}>
        <Table sx={{minWidth: 650}} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell align='center'>email</TableCell>
              <TableCell align='center'>position</TableCell>
              <TableCell align='center'>gender</TableCell>
              <TableCell align='center'>actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell align='center' colSpan={5}>
                  {loading ? (
                    <Grid
                      container
                      sx={{
                        minHeight: '200px',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <CircularProgress color='secondary' />
                    </Grid>
                  ) : null}
                </TableCell>
              </TableRow>
            ) : users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell align='center'>{user.email}</TableCell>
                  <TableCell align='center'>{user.position}</TableCell>
                  <TableCell align='center'>
                    {user.gender == 0 ? 'Male' : 'Female'}
                  </TableCell>
                  <TableCell align='center'>
                    <Box sx={{display: 'flex'}}>
                      <Button
                        onClick={() => handleEditUser(user.id)}
                        variant='outlined'>
                        Edit
                      </Button>
                      <Button
                        sx={{marginLeft: '20px'}}
                        onClick={() => handleDeleteUser(user.id)}
                        variant='outlined'
                        color='error'>
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              ''
            )}
          </TableBody>
        </Table>
        <Box
          sx={{margin: '20px auto', display: 'flex', justifyContent: 'center'}}>
          <Pagination
            color='primary'
            count={pageCount}
            showFirstButton
            showLastButton
            onChange={handleChange}
          />
        </Box>
      </TableContainer>
    </Box>
  );
};

export default UserTable;
