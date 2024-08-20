import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import DynamicForm from './components/DynamicForm/DynamicFrom';
import { ThemeProvider } from '@rneui/themed';
import { Header } from '@rneui/base';
import theme from './theme/theme';

const App = () => {
  const [currentFormId, setCurrentFormId] = useState(null);
  const [formIndex, setFormIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Set the initial form ID once data is loaded
    if (data?.forms?.length > 0) {
      setCurrentFormId(data.forms[0].id);
    }
  }, [data]);

  const fetchData = async () => {
    const baseUrl =
      Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';

    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/get-json/5`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('data', data);
      setData(data);
    } catch (err) {
      console.log('Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = () => {
    const nextFormIndex = formIndex + 1;
    if (nextFormIndex < data.forms.length) {
      setCurrentFormId(data.forms[nextFormIndex].id);
      setFormIndex(nextFormIndex);
    }
  };

  const handleFormSubmit = (formData) => {
    setFormData((prevData) => ({ ...prevData, ...formData }));
    handleFormChange();
  };

  let content;
  if (loading) {
    content = <ActivityIndicator size='large' color={theme.colors.primary} />;
  } else if (error) {
    content = <Text style={styles.errorText}>Error: {error}</Text>;
  } else if (currentFormId) {
    content = (
      <>
        <Text style={styles.text}>
          {data?.forms[formIndex]?.config?.submitButton?.formName}
        </Text>
        <DynamicForm
          forms={data?.forms}
          currentFormId={currentFormId}
          onSubmitData={handleFormSubmit}
          onFormChange={handleFormChange}
        />
      </>
    );
  } else {
    content = <Text style={styles.text}>No forms available.</Text>;
  }

  return (
    <ThemeProvider theme={theme}>
      {console.log('form', formData)}
      <SafeAreaView style={styles.container}>
        <Header
          centerComponent={{
            text: 'NSSO APP',
            style: { color: '#ffffff', fontSize: 20, textAlign: 'center' },
          }}
          leftComponent={{
            icon: 'menu',
            color: '#fff',
          }}
          containerStyle={{
            backgroundColor: theme.colors.primary,
            paddingTop: 35,
          }}
        />
        <View style={styles.content}>{content}</View>
      </SafeAreaView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: '#2c3e50',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default App;
