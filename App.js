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
import { schema } from './schema/schema';
import { ThemeProvider } from '@rneui/themed';
import { Header } from '@rneui/base';
import theme from './theme/theme';

const App = () => {
  const [currentFormId, setCurrentFormId] = useState(schema.forms[0].id);
  const [formIndex, setFormIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const baseUrl =
      Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';

    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/get-json/4`);
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
    setCurrentFormId(schema.forms[formIndex + 1].id);
    setFormIndex((prev) => prev + 1);
  };

  const handleFormSubmit = (data) => {
    console.log('blabla bla', data);
    setFormData(data);
    handleFormChange();
  };

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
        <View style={styles.content}>
          {loading ? (
            <ActivityIndicator size='large' color={theme.colors.primary} />
          ) : error ? (
            <Text style={styles.errorText}>Error: {error}</Text>
          ) : (
            <>
              <Text style={styles.text}>Hello, React Native!</Text>
              <DynamicForm
                forms={data.forms}
                currentFormId={currentFormId}
                onSubmitData={handleFormSubmit}
                onFormChange={handleFormChange}
              />
            </>
          )}
        </View>
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
