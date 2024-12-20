import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'JuliusSansOne',
    color: '#4B8562',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Jura',
    color: '#4B8562',
    marginBottom: 60,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 30,
    paddingLeft: 10,
    backgroundColor: '#FFF',
    maxWidth: 400,
  },
  button: {
    width: '60%',
    height: 50,
    backgroundColor: '#4B8562',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15,
    maxWidth: 300,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default styles;
