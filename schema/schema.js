import * as yup from 'yup';

export const schema = {
  config: {
    defaultValues: {
      firstName: '',
      lastName: '',
      age: '',
      country: null,
      dateOfBirth: null,
      fileUpload: null,
    },
    submitButton: {
      display: 'flex',
      justifyContent: 'right',
      variant: 'contained',
      color: 'primary',
    },
  },
  fields: [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      placeholder: 'Enter your first name',
      order: 1,
      rules: yup.string().required('First name is required'),
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Enter your last name',
      order: 2,
      rules: yup.string().required('Last name is required'),
    },
    {
      name: 'age',
      label: 'Age',
      type: 'number', // Use 'text' and handle number conversion in form handling
      placeholder: 'Enter your age',
      order: 3,
      rules: yup
        .number()
        .typeError('Age must be a number')
        .required('Age is required')
        .positive('Age must be a positive number')
        .integer('Age must be an integer'),
    },
    {
      name: 'country',
      label: 'Country',
      type: 'dropdown',
      placeholder: 'Select your country',
      options: [
        { label: 'USA', value: 'usa' },
        { label: 'Canada', value: 'canada' },
        { label: 'UK', value: 'uk' },
        { label: 'Australia', value: 'australia' },
      ],
      order: 4,
      rules: yup.string().required('Country is required'),
    },
    {
      name: 'dateOfBirth',
      label: 'Date of Birth',
      type: 'date',
      placeholder: 'Select your date of birth',
      order: 5,
      rules: yup.date().required('Date of Birth is required'),
    },
    // {
    //   name: 'fileUpload',
    //   label: 'File Upload',
    //   type: 'text', // Use 'text' and handle file upload separately
    //   placeholder: 'Upload your file',
    //   order: 6,
    //   rules: yup
    //     .mixed()
    //     .required('File upload is required')
    //     .test('fileSize', 'File is too large', (value) => {
    //       return value ? value.size <= 5242880 : true; // limit: 5MB
    //     })
    //     .test('fileType', 'Unsupported file type', (value) => {
    //       return value
    //         ? ['image/jpeg', 'image/png'].includes(value.type)
    //         : true; // Allowed file types
    //     }),
    // },
  ],
};
