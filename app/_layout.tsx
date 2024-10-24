import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="LoginScreen"
        options={{ 
          title: 'LoginScreen',
          headerShown: false
        }} 
      />
      <Stack.Screen
        name="CadastroUsuarioScreen"
        options={{ 
          title: 'CadastroUsuarioScreen',
          headerShown: false
        }} 
      />
      <Stack.Screen
        name="CadastroEnderecoScreen"
        options={{ 
          title: 'CadastroEnderecoScreen',
          headerShown: false
        }} 
      />
      <Stack.Screen
        name="HomeScreen"
        options={{ 
          title: 'HomeScreen',
          headerShown: false
        }} 
      />
    </Stack>
  );
}
