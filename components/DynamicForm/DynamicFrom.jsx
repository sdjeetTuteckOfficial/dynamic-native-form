import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as yup from 'yup';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Dropdown } from 'react-native-element-dropdown';
import DocumentPicker from 'react-native-document-picker';

const DynamicForm = ({ schema }) => {
  const sortedSchema = schema.fields.sort((a, b) => a.order - b.order);

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

  const handleFileUpload = async (fieldName) => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setValue(fieldName, res); // Store the file object in the form state
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the picker');
      } else {
        throw err;
      }
    }
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
                date={value ? new Date(value) : new Date()}
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

    if (field.type === 'file') {
      return (
        <Controller
          name={field.name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <TouchableOpacity
                onPress={() => handleFileUpload(field.name)}
                style={{
                  height: 40,
                  borderColor: 'gray',
                  borderWidth: 1,
                  borderRadius: 5,
                  justifyContent: 'center',
                  paddingHorizontal: 8,
                }}
              >
                <Text>
                  {value?.name || field.placeholder || 'Upload a file'}
                </Text>
              </TouchableOpacity>
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
