import React from 'react';
import { TextInput, TouchableOpacity, Text, ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocalSearchParams } from 'expo-router';
import styles from '@/styles/CadastroEnderecoScreenStyles';

const enderecoSchema = yup.object({
  cep: yup.string().required('CEP é obrigatório'),
  estado: yup.string().required('Estado é obrigatório'),
  cidade: yup.string().required('Cidade é obrigatória'),
  bairro: yup.string().required('Bairro é obrigatório'),
  logradouro: yup.string().required('Logradouro é obrigatório'),
  numero: yup.string().required('Número é obrigatório'),
  complemento: yup.string(),
  nomeCondominio: yup.string().required('Nome do Condomínio é obrigatório'),
});

const CadastroEnderecoScreen = () => {
  const { userId } = useLocalSearchParams();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(enderecoSchema),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    
    const enderecoData = {
      userId,
      ...data,
    };
  
    try {
      const response = await fetch('http://localhost:3000/cadastro-endereco', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enderecoData),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        // Navega para a próxima tela
        //router.push('/NextScreen'); // Altere para a próxima tela desejada
      } else {
        const error = await response.json();
        console.error('Erro ao cadastrar endereço:', error.message);
      }
    } catch (error) {
      console.error('Erro de rede:', error);
    }
  };
  
  return (
    <LinearGradient
      colors={['#FFFFFF', '#4B8562']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={[styles.scrollContainer, { flexGrow: 1, justifyContent: 'center' }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>SHAREHOOD</Text>
        <Text style={styles.subtitle}>
          Conectando Vizinhos,{'\n'}
          Compartilhando Recursos
        </Text>
        <Text style={styles.subtitle2}>Cadastro De Endereço</Text>
        <Text style={styles.description}>
          Nos ajude a identificar o seu condomínio e conecta-lo à sua vizinhança!
        </Text>

        <View style={styles.inputRow}>
          <Controller
            control={control}
            name="cep"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.inputHalf}
                placeholder="CEP"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
              />
            )}
          />
          <Controller
            control={control}
            name="estado"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.inputHalf}
                placeholder="Estado"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>

        <View style={styles.inputRow}>
          <Controller
            control={control}
            name="cidade"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.inputHalf}
                placeholder="Cidade"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="bairro"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.inputHalf}
                placeholder="Bairro"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>

        <Controller
          control={control}
          name="logradouro"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Logradouro"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <View style={styles.inputRow}>
          <Controller
            control={control}
            name="numero"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.inputHalf}
                placeholder="Número"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="complemento"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.inputHalf}
                placeholder="Complemento"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>

        <Controller
          control={control}
          name="nomeCondominio"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Nome do Condomínio"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>CADASTRAR</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

export default CadastroEnderecoScreen;
