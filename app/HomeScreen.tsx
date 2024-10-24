import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import styles from '@/styles/HomeScreenStyles';

const defaultImage = require('../assets/images/default-image-resource.png');

const HomeScreen = () => {

    const [activeTab, setActiveTab] = useState('Recursos');

    const user = {
    nome: 'João Silva',
    avatarUrl: null,
    };

    const data = [
    { id: 1, nome: 'Nome do Anunciante', unidade: 'Unidade', titulo: 'Título', descricao: 'Breve descrição...', image: null },
    { id: 2, nome: 'Nome do Anunciante', unidade: 'Unidade', titulo: 'Título', descricao: 'Breve descrição...', image: 'https://link-para-imagem.com/imagem.jpg' },
    ];

    const renderTabContent = () => {
    return (
        <ScrollView>
        {data.map((item) => (
            <Card key={item.id} style={styles.card}>
            <View style={styles.cardContent}>
                <Avatar.Icon 
                size={40}
                icon="account" 
                style={styles.cardAvatar} 
                />
                <View>
                <Text style={styles.cardName}>{item.nome}</Text>
                <Text style={styles.cardSubtitle}>{item.unidade}</Text>
                <Text style={styles.cardTitle}>{item.titulo}</Text>
                <Text style={styles.cardDescription}>{item.descricao}</Text>
                </View>
                <Image source={defaultImage} style={styles.image}/>
            </View>
            </Card>
        ))}
        </ScrollView>
    );
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
        <Text style={styles.subtitle}>Seja bem-vindo! Clique para solicitar...</Text>
        <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setActiveTab('Recursos')}>
            <Text style={[styles.tab, activeTab === 'Recursos' && styles.activeTab]}>Recursos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Serviços')}>
            <Text style={[styles.tab, activeTab === 'Serviços' && styles.activeTab]}>Serviços</Text>
        </TouchableOpacity>
        </View>

        {renderTabContent()}

        <View style={styles.bottomBar}>
        <TouchableOpacity>
            <Ionicons name="home-outline" style={styles.icons} />
        </TouchableOpacity>
        <TouchableOpacity>
            <Ionicons name="add-circle-outline" style={styles.icons} />
        </TouchableOpacity>
        <TouchableOpacity>
            <Ionicons name="person-outline" style={styles.icons} />
        </TouchableOpacity>
        </View>
    </View>
    );
};

export default HomeScreen;
