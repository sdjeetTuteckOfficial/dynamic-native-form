import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DateField = ({ control, field, errors }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  return (
    <View style={{ marginBottom: 15 }}>
      <Text>{field.label}</Text>
      <Controller
        name={field.name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <TouchableOpacity onPress={showDatePicker}>
              <Text>{value || field.placeholder}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode='date'
              date={value ? new Date(value) : new Date()}
              onConfirm={(date) => {
                onChange(date.toISOString().split('T')[0]);
                hideDatePicker();
              }}
              onCancel={hideDatePicker}
            />
          </>
        )}
      />
      {errors[field.name] && (
        <Text style={{ color: 'red' }}>{errors[field.name].message}</Text>
      )}
    </View>
  );
};

export default DateField;
