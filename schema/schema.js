export const schema = {
  forms: [
    {
      id: 'form1',
      renderOrder: 0,
      config: {
        defaultValues: {
          firstName: '',
          lastName: '',
          age: null,
        },
        submitButton: {
          display: 'flex',
          justifyContent: 'right',
          variant: 'contained',
          color: 'blue',
          formName: 'Form 1',
        },
      },
      fields: [
        {
          name: 'firstName',
          label: 'First Name',
          type: 'text',
          placeholder: 'Enter your first name',
          order: 1,
          rules: {
            type: 'string',
            required: true,
            message: 'First name is required',
          },
        },
        {
          name: 'lastName',
          label: 'Last Name',
          type: 'text',
          placeholder: 'Enter your last name',
          order: 2,
          rules: {
            type: 'string',
            required: true,
            message: 'Last name is required',
          },
        },
        {
          name: 'age',
          label: 'Age',
          type: 'number',
          placeholder: 'Enter your age',
          order: 3,
          rules: {
            type: 'number',
            required: true,
            message: 'Age is required',
            typeError: 'Age must be a number',
            positive: true,
            integer: true,
          },
        },
      ],
    },
    {
      id: 'form2',
      renderOrder: 1,
      config: {
        defaultValues: {
          country: null,
          dateOfBirth: null,
        },
        submitButton: {
          display: 'flex',
          justifyContent: 'right',
          variant: 'contained',
          color: 'green',
          formName: 'Form 2',
        },
      },
      fields: [
        {
          name: 'country',
          label: 'Country',
          type: 'dropdown',
          placeholder: 'Select your country',
          options: [
            { label: 'USA', value: 'usa' },
            { label: 'Canada', value: 'canada' },
            { label: 'UK', value: 'uk' },
          ],
          order: 1,
          rules: {
            type: 'string',
            required: true,
            message: 'Country is required',
          },
        },
        {
          name: 'dateOfBirth',
          label: 'Date of Birth',
          type: 'date',
          placeholder: 'Select your date of birth',
          order: 2,
          rules: {
            type: 'date',
            required: false,
            nullable: true,
            message: 'Date of Birth is required',
          },
        },
      ],
    },
  ],
};
