import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {FormikProps} from 'formik';
import {FormHelperText} from '@mui/material';
import * as types from './types';

interface IProps extends FormikProps<types.IInitialValues> {
  name: string;
  label: string;
  options: types.IPosition[];
}

const FormSelect = ({
  name,
  label,
  options,
  errors,
  submitCount,
  values,
  handleChange,
}: IProps) => {
  return (
    <FormControl fullWidth error={!!submitCount && !!errors.position}>
      <InputLabel id='demo-simple-select-label'>{label}</InputLabel>
      <Select
        name={name}
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={values.position}
        label={label}
        onChange={handleChange}>
        {options.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {!!submitCount && !!errors.position && (
        <FormHelperText>{errors.position}</FormHelperText>
      )}
    </FormControl>
  );
};

export default FormSelect;
