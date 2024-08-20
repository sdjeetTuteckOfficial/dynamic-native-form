import { useEffect, useState } from 'react';
import { Platform, ActivityIndicator } from 'react-native';
import { ThemeProvider } from '@rneui/themed';
import theme from './theme/theme';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Header } from '@rneui/base';
import DynamicForm from './components/DynamicForm/DynamicFrom';

const App = () => {
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
      const response = await fetch(`${baseUrl}/get-json/1`);
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

  return (
    <ThemeProvider theme={theme}>
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
              <DynamicForm schema={data} onSubmit={() => {}} />
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
