import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {FormikProps} from 'formik';
import {FormHelperText} from '@mui/material';
import * as types from './types';

interface IProps extends FormikProps<types.IInitialValues> {
  label: string;
  name: string;
  items: types.IGender[];
}

export default function RadioField({
  label,
  name,
  items,
  submitCount,
  errors,
  values,
  handleChange,
}: IProps) {
  return (
    <FormControl>
      <FormLabel id='demo-radio-buttons-group-label'>{label}</FormLabel>
      <RadioGroup row name={name} value={values.gender} onChange={handleChange}>
        {items.map((gender) => (
          <FormControlLabel
            value={gender.value}
            control={<Radio />}
            label={gender.label}
            key={gender.label}
          />
        ))}
      </RadioGroup>
      {!!submitCount && !!errors.gender && (
        <FormHelperText>{errors.gender}</FormHelperText>
      )}
    </FormControl>
  );
}
