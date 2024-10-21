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

  const onSubmit = async (data: any) => {
    console.log(data);
    // Aqui você pode adicionar a lógica para autenticar o usuário
    // e navegar para a próxima tela após o login bem-sucedido
    // router.push('/NextScreen'); // Altere para a tela que você deseja navegar após o login
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

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
