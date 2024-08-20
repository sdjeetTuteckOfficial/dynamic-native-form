import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormFieldWrapper from './FormFieldWrapper/FormFieldWrapper';
import { parseRules } from '../../utilities/functions/parser';

const DynamicForm = ({ forms, currentFormId, onSubmitData, onFormChange }) => {
  const form = forms.find((f) => f.id === currentFormId);
  if (!form) {
    return <Text>Form not found</Text>;
  }

  const { config, fields } = form;

  const sortedFields = fields.sort((a, b) => a.order - b.order);

  const validationSchema = yup.object().shape(
    sortedFields.reduce((acc, field) => {
      acc[field.name] = parseRules(field.rules);
      return acc;
    }, {})
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: config.defaultValues,
  });

  const handleFormSubmit = (data) => {
    onSubmitData(data);
  };

  return (
    <View style={{ padding: 20, marginBottom: 30 }}>
      {sortedFields.map((field) => (
        <FormFieldWrapper
          key={field.name}
          control={control}
          field={field}
          errors={errors}
        />
      ))}
      <TouchableOpacity
        onPress={handleSubmit(handleFormSubmit)}
        style={{
          backgroundColor: config.submitButton.color,
          padding: 10,
          borderRadius: 5,
          alignSelf: config.submitButton.justifyContent,
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          {config.submitButton.formName}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DynamicForm;
