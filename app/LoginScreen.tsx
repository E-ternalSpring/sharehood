import React from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from '@/styles/LoginScreenStyles';

type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
};

type LoginScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};

const loginSchema = yup.object({
  cpf: yup.string().required('CPF é obrigatório').min(11, 'CPF deve ter 11 dígitos'),
  password: yup.string().required('Senha é obrigatória').min(6, 'Senha deve ter ao menos 6 caracteres'),
});

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SHAREHOOD</Text>
      <Text>Conectando Vizinhos, Compartilhando Recursos</Text>
      
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

      <Button title="Entrar" onPress={handleSubmit(onSubmit)} />
      <Button title="Cadastrar" onPress={() => navigation.navigate('Cadastro')} />
    </View>
  );
};

export default LoginScreen;
