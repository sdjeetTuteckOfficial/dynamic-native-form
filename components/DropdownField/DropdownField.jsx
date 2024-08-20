import React from 'react';
import { Controller } from 'react-hook-form';
import { Dropdown } from 'react-native-element-dropdown';
import { View, Text } from 'react-native';

const DropdownField = ({ control, field, errors }) => (
  <View style={{ marginBottom: 15 }}>
    <Text>{field.label}</Text>
    <Controller
      name={field.name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Dropdown
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 8,
            backgroundColor: '#fafafa',
          }}
          data={field.options}
          labelField='label'
          valueField='value'
          placeholder={field.placeholder || 'Select an option'}
          value={value}
          onChange={(item) => onChange(item.value)}
        />
      )}
    />
    {errors[field.name] && (
      <Text style={{ color: 'red' }}>{errors[field.name].message}</Text>
    )}
  </View>
);

export default DropdownField;
