import React from 'react';
import DropdownField from '../../DropdownField/DropdownField';
import DateField from '../../Datefield/Datefield';
import TextField from '../../Textfield/Textfield';

const FormFieldWrapper = ({ control, field, errors }) => {
  switch (field.type) {
    case 'dropdown':
      return <DropdownField control={control} field={field} errors={errors} />;
    case 'date':
      return <DateField control={control} field={field} errors={errors} />;
    case 'text':
    case 'number':
      return <TextField control={control} field={field} errors={errors} />;
    default:
      return null;
  }
};

export default FormFieldWrapper;
