import {TextField} from '@mui/material';
import {ErrorMessage, Field, FormikProps} from 'formik';
import * as types from './types';

interface IProps extends FormikProps<types.IInitialValues> {
  label: string;
  name: string;
}

const FormikField = ({name, label, errors, submitCount}: IProps) => {
  return (
    <Field
      fullWidth
      name={name}
      label={label}
      error={!!submitCount && errors[name as keyof types.IInitialValues]}
      helperText={!!submitCount && <ErrorMessage name={name} />}
      as={TextField}
    />
  );
};

export default FormikField;
