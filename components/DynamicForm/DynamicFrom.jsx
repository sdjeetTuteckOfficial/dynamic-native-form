import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { View, Text, TouchableOpacity } from 'react-native';
import * as yup from 'yup';
import FormFieldWrapper from './FormFieldWrapper/FormFieldWrapper';
import { parseRules } from '../../utilities/functions/parser';

const DynamicForm = ({ schema }) => {
  const sortedSchema = schema.fields.sort((a, b) => a.order - b.order);

  const validationSchema = yup.object().shape(
    sortedSchema.reduce((acc, field) => {
      acc[field.name] = parseRules(field.rules);
      return acc;
    }, {})
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: schema.config.defaultValues,
  });

  const onSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <View style={{ padding: 20 }}>
      {console.log('Form errors:', errors)}
      {sortedSchema.map((field) => (
        <FormFieldWrapper
          key={field.name}
          control={control}
          field={field}
          errors={errors}
        />
      ))}
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DynamicForm;
