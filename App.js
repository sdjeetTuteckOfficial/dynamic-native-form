import React from 'react';
import { ThemeProvider } from '@rneui/themed';
import theme from './theme/theme';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Header } from '@rneui/base';
import DynamicForm from './components/DynamicForm/DynamicFrom';
import { schema } from './schema/schema';

const App = () => {
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
            // margin: 10,
          }}
        />
        <View style={styles.content}>
          <Text style={styles.text}>Hello, React Native!</Text>
          <DynamicForm schema={schema} onSubmit={() => {}} />
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
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#2c3e50',
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default App;
