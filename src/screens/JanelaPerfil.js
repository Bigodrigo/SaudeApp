//Página q junto da Home page envia as navegações! Sempre atualizar no Stack.Navigator!!
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import EditarDados from './EditarDados';
import Perfil from './Perfil';

const Stack = createNativeStackNavigator()
export default function Home({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Perfil" screenOptions={{ headerShown: false }} >
      <Stack.Screen
        name="EditarDados"
        component={EditarDados}
        options={{ title: 'Editar Dados', headerShown: true, headerTintColor: '#fff', headerStyle: { backgroundColor: '#DB4D37' } }}
      />
    <Stack.Screen
        name="Perfil"
        component={Perfil}
      />

 

    </Stack.Navigator>
  );
}