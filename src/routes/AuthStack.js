// As rotas são os caminhos de navegação, aonde nós acessamos as telas e abrimos no App, temos q abrir o login primeiro e dps home e outros!
// Nesse momento para não precisar ficar fazendo o login toda h, estamos direcionados para a Home page, essa pasta será atualizada antes da entrega final!
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Introducao from '../screens/Introducao'
import { Login } from '../screens/Login'
import Registro from '../screens/Registro'
import RedefinirSenha from '../screens/RedefinirSenha'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator()

export default function AuthStack() {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);

  React.useEffect(() => {
    async function checkAppFirstLaunched() {
      const appData = await AsyncStorage.getItem('isAppFirstLaunched');
      if (appData == null) {
        setIsAppFirstLaunched(true);
        await AsyncStorage.setItem('isAppFirstLaunched', 'false');
      } else {
        setIsAppFirstLaunched(false);
      }
    }

    checkAppFirstLaunched();
  }, []);

  return (
    isAppFirstLaunched != null && (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAppFirstLaunched && (
          <Stack.Screen name="Introducao" component={Introducao} />
        )}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="RedefinirSenha" component={RedefinirSenha} />
      </Stack.Navigator>
    )
  );
}