import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000';

export const login = async (cpf: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cpf, password }),
    });

    if (!response.ok) {
      throw new Error('Login falhou');
    }

    const data = await response.json();

    // Salvar dados do usuário no AsyncStorage
    await AsyncStorage.setItem('user', JSON.stringify(data.user));
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
