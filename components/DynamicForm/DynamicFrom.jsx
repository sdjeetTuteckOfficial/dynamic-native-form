import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as yup from 'yup';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Dropdown } from 'react-native-element-dropdown';

const DynamicForm = ({ schema }) => {
  const sortedSchema = schema.fields.sort((a, b) => a.order - b.order);

  // Create validation schema using yup
  const validationSchema = yup.object().shape(
    sortedSchema.reduce((acc, field) => {
      acc[field.name] = field.rules || yup.string();
      return acc;
    }, {})
  );

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: schema.config.defaultValues,
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentFieldName, setCurrentFieldName] = useState(null);

  const onSubmit = (data) => {
    console.log('Form data:', data);
  };

  const showDatePicker = (fieldName) => {
    setCurrentFieldName(fieldName);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log('val', date, date.toISOString().split('T')[0]);
    setValue(currentFieldName, date.toISOString().split('T')[0]); // Set the date value in the form
    hideDatePicker();
  };

  const renderField = (field) => {
    if (field.type === 'dropdown') {
      return (
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
              onChange={(item) => {
                onChange(item.value);
              }}
            />
          )}
        />
      );
    }

    if (field.type === 'date') {
      return (
        <Controller
          name={field.name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <TouchableOpacity onPress={() => showDatePicker(field.name)}>
                <Text>{value || field.placeholder}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={
                  isDatePickerVisible && currentFieldName === field.name
                }
                mode='date'
                date={value ? new Date(value) : new Date()} // Default date handling
                onConfirm={(date) => {
                  onChange(date.toISOString().split('T')[0]);
                  hideDatePicker();
                }}
                onCancel={hideDatePicker}
              />
              {errors[field.name] && (
                <Text style={{ color: 'red' }}>
                  {errors[field.name].message}
                </Text>
              )}
            </>
          )}
        />
      );
    }

    // if (field.type === 'date') {
    //   console.log('field', field);
    //   const date = field?.value ? new Date(field?.value) : new Date();
    //   console.log('date', date);
    //   return (
    //     <View>
    //       <Controller
    //         name={field.name}
    //         control={control}
    //         render={({ field: { value } }) => (
    //           <TouchableOpacity onPress={() => showDatePicker(field.name)}>
    //             <Text>{value || field.placeholder}</Text>
    //           </TouchableOpacity>
    //         )}
    //       />
    //       <DateTimePickerModal
    //         isVisible={isDatePickerVisible && currentFieldName === field.name}
    //         mode='date'
    //         date={date}
    //         onConfirm={handleConfirm}
    //         onCancel={hideDatePicker}
    //       />
    //     </View>
    //   );
    // }

    if (field.type === 'text' || field.type === 'number') {
      return (
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
      );
    }

    return null;
  };

  return (
    <View style={{ padding: 20 }}>
      {console.log('err', errors)}
      {sortedSchema.map((field) => (
        <View key={field.name} style={{ marginBottom: 15 }}>
          <Text>{field.label}</Text>
          {renderField(field)}
          {errors[field.name] && (
            <Text style={{ color: 'red' }}>{errors[field.name].message}</Text>
          )}
        </View>
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
