import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
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
    marginBottom: 40,
    textAlign: 'center',
  },
  subtitle2: {
    fontSize: 18,
    fontFamily: 'Inter-VariableFont_opsz,wght',
    color: '#4B8562',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    width: '80%',
    fontSize: 14,
    fontFamily: 'Inter-VariableFont_opsz,wght',
    color: '#4B8562',
    marginBottom: 40,
    textAlign: 'center',
    maxWidth: 400,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: '#FFF',
    maxWidth: 400,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    maxWidth: 400,
  },
  inputHalf: {
    width: '48%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    maxWidth: 400,
  },
  button: {
    width: '60%',
    height: 50,
    backgroundColor: '#4B8562',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 25,
    marginBottom: 15,
    maxWidth: 300,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
