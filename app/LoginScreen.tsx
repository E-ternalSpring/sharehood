import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import * as Font from 'expo-font';
import styles from '@/styles/LoginScreenStyles';

const loginSchema = yup.object({
  cpf: yup.string().required('CPF é obrigatório').min(11, 'CPF deve ter 11 dígitos'),
  password: yup.string().required('Senha é obrigatória').min(6, 'Senha deve ter ao menos 6 caracteres'),
});

const LoginScreen = () => {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'JuliusSansOne': require('@/assets/fonts/JuliusSansOne-Regular.ttf'),
        'Jura': require('@/assets/fonts/Jura-VariableFont_wght.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator color="#0000ff" />;
  }

  const loginUser = async (cpf: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('https://sua-api.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cpf, password }),
      });

      if (!response.ok) {
        throw new Error('Erro ao autenticar');
      }

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  //const onSubmit = async (data: any) => {
    //console.log(data);
    //const success = await loginUser(data.cpf, data.password);

    //if (success) {
    //  router.push('./HomeScreen');
    //  setLoginError(null);
    //} else {
    //  setLoginError('Credenciais inválidas. Tente novamente.');
    //}
  //};

  const onSubmit = async (data: any) => {
    // Temporariamente ignora a autenticação e redireciona direto para a HomeScreen
    router.push('./HomeScreen');
    setLoginError(null);
  };

  return (
    <LinearGradient
      colors={['#FFFFFF', '#4B8562']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.title}>SHAREHOOD</Text>
      <Text style={styles.subtitle}>
        Conectando Vizinhos,{'\n'}
        Compartilhando Recursos
      </Text>

      <Controller
        control={control}
        name="cpf"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="CPF"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="numeric"
          />
        )}
      />
      {errors.cpf && <Text style={styles.error}>{errors.cpf.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Senha"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('./CadastroUsuarioScreen')}>
        <Text style={styles.buttonText}>CADASTRAR</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default LoginScreen;
