import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Switch } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import styles from '@/styles/GestaoRecursosScreenStyles';

const defaultImage = require('../assets/images/default-image-resource.png');

interface Recurso {
  nome: string;
  descricao: string;
  imagem: any;
  disponivel: boolean;
}

const GestaoRecursosScreen = () => {
  const router = useRouter();
  const [nomeItem, setNomeItem] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('Recursos');
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [userId, setUserId] = useState(1);

  const user = {
    nome: 'João Silva',
    avatarUrl: null,
  };

  // Carregar recursos ao carregar a tela
  useEffect(() => {
    const fetchRecursos = async () => {
      try {
        const response = await fetch(`http://localhost:3000/recursos/${userId}`);
        const data = await response.json();
        
        if (data && Array.isArray(data)) {
          setRecursos(data); // Atualiza o estado com os recursos
        } else {
          console.log('Nenhum recurso encontrado para o usuário');
        }
      } catch (error) {
        console.error("Erro ao carregar recursos:", error);
      }
    };
  
    if (userId) {  // Certifique-se de que o userId é válido
      fetchRecursos();
    }
  }, [userId]); // Isso vai ser executado sempre que o userId mudar
  const handleAdicionarImagem = () => {
    console.log("Adicionar imagem");
  };

  const handleCadastrar = async () => {
    const novoRecurso: Recurso = { nome: nomeItem, descricao, imagem, disponivel: true };

    try {
      const response = await fetch('http://localhost:3000/cadastro-recurso', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          nome: nomeItem,
          descricao,
          imagem: imagem || 'default-image-url',
          disponivel: true,
        }),
      });

      const data = await response.json();

      if (data.message === 'Recurso cadastrado com sucesso') {
        setRecursos([...recursos, novoRecurso]);
        setNomeItem('');
        setDescricao('');
        setImagem(null);
        console.log("Recurso cadastrado:", novoRecurso);
      } else {
        console.error("Erro ao cadastrar recurso:", data.error);
      }
    } catch (error) {
      console.error("Erro de conexão com o servidor:", error);
    }
  };

  const toggleDisponibilidade = (index: number) => {
    setRecursos((prevRecursos) =>
      prevRecursos.map((recurso, i) => 
        i === index ? { ...recurso, disponivel: !recurso.disponivel } : recurso
      )
    );
  };

  const handleUpdateRecurso = (index: number, updatedNome: string, updatedDescricao: string) => {
    const updatedRecursos = [...recursos];
    updatedRecursos[index] = { ...updatedRecursos[index], nome: updatedNome, descricao: updatedDescricao };
    setRecursos(updatedRecursos);
  };

  return (
    <View style={styles.container}>
      {user.avatarUrl ? (
        <Avatar.Image 
          source={{ uri: user.avatarUrl }} 
          size={50}
          style={styles.avatar} 
        />
        ) : (
        <Avatar.Icon 
          size={50}
          icon="account" 
          style={styles.avatar} 
        />
      )}
      <Text style={styles.title}>SHAREHOOD</Text>
      <Text style={styles.subtitle}>Compartilhe algo com seus vizinhos!</Text>

      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setActiveTab('Recursos')}>
          <Text style={[styles.tab, activeTab === 'Recursos' && styles.activeTab]}>Recursos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Serviços')}>
          <Text style={[styles.tab, activeTab === 'Serviços' && styles.activeTab]}>Serviços</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Gestão')}>
          <Text style={[styles.tab, activeTab === 'Gestão' && styles.activeTab]}>Gestão</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} style={{ display: activeTab === 'Recursos' ? 'flex' : 'none' }}>
        {activeTab === 'Recursos' && (
          <>
            <Text style={styles.sectionTitle}>Oferecer Recurso</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Nome do item"
              value={nomeItem}
              onChangeText={setNomeItem}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Breve descrição"
              value={descricao}
              onChangeText={setDescricao}
              multiline
            />

            <TouchableOpacity onPress={handleAdicionarImagem}>
              {imagem ? (
                <Image source={imagem} style={styles.image} />
              ) : (
                <Image source={defaultImage} style={styles.image} />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={handleAdicionarImagem}>
              <Text style={styles.buttonText}>ADICIONAR IMAGEM</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleCadastrar}>
              <Text style={styles.buttonText}>CADASTRAR</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.contentContainer2} style={{ display: activeTab === 'Gestão' ? 'flex' : 'none' }}>
        {activeTab === 'Gestão' && (
          <View>
            {recursos.length === 0 ? (
              <Text style={styles.noRecursosText}>Nenhum recurso está sendo compartilhado.</Text>
            ) : (
              recursos.map((recurso, index) => (
                <View key={index} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Switch
                      value={recurso.disponivel}
                      onValueChange={() => toggleDisponibilidade(index)}
                    />
                    <Text style={[styles.statusText, { color: recurso.disponivel ? '#4B8562' : '#D9534F' }]}>
                      {recurso.disponivel ? 'Disponível' : 'Alugado'}
                    </Text>
                  </View>
                  <View style={styles.textContainer}>
                    <TextInput
                      style={styles.input}
                      value={recurso.nome}
                      onChangeText={(text) => handleUpdateRecurso(index, text, recurso.descricao)}
                      placeholder="Nome do item"
                    />
                    
                    <TextInput
                      style={styles.input}
                      value={recurso.descricao}
                      onChangeText={(text) => handleUpdateRecurso(index, recurso.nome, text)}
                      placeholder="Breve descrição"
                      multiline
                    />
                  </View>
                  <View style={styles.imageAndButtonsContainer}>
                    <TouchableOpacity onPress={handleAdicionarImagem}>
                      <Image source={imagem || defaultImage} style={styles.imageGestao} />
                    </TouchableOpacity>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity style={styles.updateButton} onPress={handleAdicionarImagem}>
                        <Text style={styles.buttonText}>EDITAR</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.deleteButton} onPress={handleCadastrar}>
                        <Text style={styles.buttonText}>EXCLUIR</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => router.push('./HomeScreen')}>
          <Ionicons name="home-outline" style={styles.icons} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Adicionar Recurso')}>
          <Ionicons name="add-circle-outline" style={styles.icons} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Perfil do Usuário')}>
          <Ionicons name="person-outline" style={styles.icons} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GestaoRecursosScreen;
