import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="LoginScreen"
        options={{ 
          title: 'Login',
          headerShown: false
        }} 
      />
      <Stack.Screen
        name="CadastroUsuarioScreen"
        options={{ 
          title: 'Cadastro',
          headerShown: false
        }} 
      />
    </Stack>
  );
}
