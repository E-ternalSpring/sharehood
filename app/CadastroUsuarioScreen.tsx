import React from 'react';
import { TextInput, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import styles from '@/styles/CadastroUsuarioScreenStyles';

const cadastroSchema = yup.object({
  nome: yup.string().required('Nome completo é obrigatório'),
  cpf: yup.string().required('CPF é obrigatório').min(11, 'CPF deve ter 11 dígitos'),
  email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha é obrigatória').min(6, 'Senha deve ter ao menos 6 caracteres'),
});

const CadastroUsuarioScreen = () => {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(cadastroSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch('http://<SeuServidor>/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      if (response.ok) {
        router.push({
          pathname: '/CadastroEnderecoScreen',
          params: { userId: result.userId },
        });
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  const [fontsLoaded] = useFonts({
    'JuliusSansOne': require('@/assets/fonts/JuliusSansOne-Regular.ttf'),
    'Jura': require('@/assets/fonts/Jura-VariableFont_wght.ttf'),
    'Inter-VariableFont_opsz,wght': require('@/assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
    'Inter-Italic-VariableFont_opsz,wght': require('@/assets/fonts/Inter-Italic-VariableFont_opsz,wght.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator color="#0000ff" />;
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
      <Text style={styles.subtitle2}>Crie sua conta</Text>

      <Controller
        control={control}
        name="nome"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.nome && <Text style={styles.error}>{errors.nome.message}</Text>}

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
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

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
        <Text style={styles.buttonText}>PRÓXIMO</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/LoginScreen')}>
        <Text style={styles.text}>Já tem uma conta?</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default CadastroUsuarioScreen;
