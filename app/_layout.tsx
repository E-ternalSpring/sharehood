import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native"; // Necessário para layouts customizados se for usado

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="LoginScreen"
        options={{
          title: "LoginScreen",
          headerShown: false, // Remove o cabeçalho nativo
        }}
      />
      <Stack.Screen
        name="CadastroUsuarioScreen"
        options={{
          title: "CadastroUsuarioScreen",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CadastroEnderecoScreen"
        options={{
          title: "CadastroEnderecoScreen",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HomeScreen"
        options={{
          title: "HomeScreen",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GestaoRecursosScreen"
        options={{
          title: "GestaoRecursosScreen",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
