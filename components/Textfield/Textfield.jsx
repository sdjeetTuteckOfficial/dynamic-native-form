import React from 'react';
import { Controller } from 'react-hook-form';
import { View, Text, TextInput } from 'react-native';

const TextField = ({ control, field, errors }) => (
  <View style={{ marginBottom: 15 }}>
    <Text>{field.label}</Text>
    <Controller
      name={field.name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 8,
          }}
          placeholder={field.placeholder}
          keyboardType={field.type === 'number' ? 'numeric' : 'default'}
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
        />
      )}
    />
    {errors[field.name] && (
      <Text style={{ color: 'red' }}>{errors[field.name].message}</Text>
    )}
  </View>
);

export default TextField;
