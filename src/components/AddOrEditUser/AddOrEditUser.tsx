import {Button, Container, Grid} from '@mui/material';
import {Form, Formik} from 'formik';
import FormikField from './FormikField';
import * as Yup from 'yup';
import FormSelect from './FormSelect';
import RadioField from './RadioField';
import * as types from './types';
import {useConsumeContext} from '../../context/UserContext';

const positionOptions: types.IPosition[] = [
  {value: 'frontend', label: 'frontend'},
  {value: 'backend', label: 'backend'},
];

const genderItems: types.IGender[] = [
  {value: 0, label: 'Male'},
  {value: 1, label: 'Female'},
];

const validationSchema = Yup.object({
  name: Yup.string().required('please enter your name'),
  email: Yup.string().required('please enter your email'),
  position: Yup.string().required('please enter your position'),
  gender: Yup.number().required('please enter your position'),
});

const AddOrEditUser = () => {
  const {mode, addNewUser, edit, editUser} = useConsumeContext();

  const initialValues: types.IInitialValues = edit.data
    ? {
        name: edit.data.name,
        email: edit.data.email,
        position: edit.data.position,
        gender: edit.data.gender,
      }
    : {
        name: '',
        email: '',
        position: '',
        gender: 0,
      };

  const handleSubmit = (values: types.IInitialValues) => {
    if (mode === 'add') {
      addNewUser(values);
    } else {
      editUser(values);
    }
  };

  return (
    <Container maxWidth='md'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {(props) => (
          <Form>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <FormikField {...props} name='name' label='name' />
              </Grid>
              <Grid item xs={6}>
                <FormikField {...props} name='email' label='email' />
              </Grid>
              <Grid item xs={6}>
                <FormSelect
                  name='position'
                  label='position'
                  options={positionOptions}
                  {...props}
                />
              </Grid>
              <Grid item xs={6}>
                <RadioField
                  {...props}
                  name='gender'
                  label='gender'
                  items={genderItems}
                />
              </Grid>
            </Grid>
            <Button type='submit' variant='contained'>
              send
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddOrEditUser;
