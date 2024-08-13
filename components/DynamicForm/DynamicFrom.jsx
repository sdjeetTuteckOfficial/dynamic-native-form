// import React from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
// import * as yup from 'yup';
// import DropDownPicker from 'react-native-dropdown-picker';
// import DatePicker from 'react-native-datepicker';

// const DynamicForm = ({ schema }) => {
//   const sortedSchema = schema.fields.sort((a, b) => a.order - b.order);

//   // Create validation schema using yup
//   const validationSchema = yup.object().shape(
//     sortedSchema.reduce((acc, field) => {
//       acc[field.name] = field.rules || yup.string();
//       return acc;
//     }, {})
//   );

//   const { control, handleSubmit } = useForm({
//     resolver: yupResolver(validationSchema),
//     defaultValues: schema.config.defaultValues,
//   });

//   const onSubmit = (data) => {
//     console.log('Form data:', data);
//   };

//   const renderField = (field) => {
//     if (field.type === 'dropdown') {
//       return (
//         <Controller
//           name={field.name}
//           control={control}
//           render={({ field: { onChange, onBlur, value } }) => (
//             <DropDownPicker
//               items={field.options}
//               defaultValue={value}
//               containerStyle={{ height: 40 }}
//               style={{ backgroundColor: '#fafafa' }}
//               dropDownStyle={{ backgroundColor: '#fafafa' }}
//               onChangeItem={(item) => onChange(item.value)}
//               onBlur={onBlur}
//             />
//           )}
//         />
//       );
//     }

//     if (field.type === 'date') {
//       return (
//         <Controller
//           name={field.name}
//           control={control}
//           render={({ field: { onChange, onBlur, value } }) => (
//             <DatePicker
//               style={{ width: '100%' }}
//               date={value}
//               mode='date'
//               placeholder={field.placeholder}
//               format='YYYY-MM-DD'
//               onDateChange={onChange}
//               onBlur={onBlur}
//             />
//           )}
//         />
//       );
//     }

//     if (field.type === 'text' || field.type === 'number') {
//       return (
//         <Controller
//           name={field.name}
//           control={control}
//           render={({ field: { onChange, onBlur, value } }) => (
//             <TextInput
//               style={{
//                 height: 40,
//                 borderColor: 'gray',
//                 borderWidth: 1,
//                 marginBottom: 10,
//                 paddingHorizontal: 8,
//               }}
//               placeholder={field.placeholder}
//               keyboardType={field.type === 'number' ? 'numeric' : 'default'}
//               onChangeText={onChange}
//               onBlur={onBlur}
//               value={value}
//             />
//           )}
//         />
//       );
//     }

//     return null;
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       {sortedSchema.map((field) => (
//         <View key={field.name} style={{ marginBottom: 15 }}>
//           <Text>{field.label}</Text>
//           {renderField(field)}
//         </View>
//       ))}
//       <TouchableOpacity
//         onPress={handleSubmit(onSubmit)}
//         style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
//       >
//         <Text style={{ color: 'white', textAlign: 'center' }}>Submit</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default DynamicForm;
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as yup from 'yup';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DynamicForm = ({ schema }) => {
  const sortedSchema = schema.fields.sort((a, b) => a.order - b.order);

  // Create validation schema using yup
  const validationSchema = yup.object().shape(
    sortedSchema.reduce((acc, field) => {
      acc[field.name] = field.rules || yup.string();
      return acc;
    }, {})
  );

  const { control, handleSubmit, setValue, getValues } = useForm({
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
    setValue(currentFieldName, date.toISOString().split('T')[0]); // Set the date value in the form
    hideDatePicker();
  };

  const renderField = (field) => {
    if (field.type === 'dropdown') {
      return (
        <Controller
          name={field.name}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <DropDownPicker
              items={field.options}
              defaultValue={value}
              containerStyle={{ height: 40 }}
              style={{ backgroundColor: '#fafafa' }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={(item) => onChange(item.value)}
              onBlur={onBlur}
            />
          )}
        />
      );
    }

    if (field.type === 'date') {
      return (
        <View>
          <Controller
            name={field.name}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TouchableOpacity onPress={() => showDatePicker(field.name)}>
                <Text>{value || field.placeholder}</Text>
              </TouchableOpacity>
            )}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible && currentFieldName === field.name}
            mode='date'
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
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
