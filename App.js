import React, { useEffect, useCallback, useState } from 'react';
import { NativeBaseProvider, StatusBar, View } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/Routes';
import { AuthProvider } from './src/contexts/AuthProvider';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import 'expo-dev-client';

//Estilos
import { THEME } from './styles/theme';
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_900Black } from '@expo-google-fonts/roboto';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Inconsolata_400Regular, Inconsolata_500Medium, Inconsolata_600SemiBold, } from '@expo-google-fonts/inconsolata';
import { Poppins_500Medium } from '@expo-google-fonts/poppins'
import notifee from '@notifee/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiToken } from './src/routes/api';
import { navigationRef } from './src/routes/RootNavigation';

async function bootstrap() {
  try {
    const initialNotification = await notifee.getInitialNotification()
    if (initialNotification) {
      const userid = initialNotification.notification.data.userid
      const userInput = initialNotification.input
      let readDate = new Date()

      if (initialNotification.pressAction.id === 'reply') {
        console.log('initialNotification')
        try {
          fetch(`https://saude-api.vercel.app/api/update-notification/${userid}`, {
            method: 'PUT',
            body: JSON.stringify({
              userReply: userInput,
              readConfirm: new Date()
            }),
            headers: {
              Accept: 'application/json',
              'Content-type': 'application/json'
            }
          })
            .then(function (response) {
              console.log('Conexão com a API efetuada com sucesso!')
            })
            .catch(function (error) {
              console.log(error)
            })
        } catch (e) {
          console.log('nao foi' + e)
        }
      }
    }
  } catch (e) {
    console.log('initialNotification não setado.')
  }

}

async function permissaoNotificacao() {
  await notifee.requestPermission().catch(e => console.error(e))
}

function CustomStatusBar({ backgroundColor, barStyle = "dark-content" }) {
  const insets = useSafeAreaInsets()
  return (
    <View style={{ height: insets.top, backgroundColor }}>
      <StatusBar translucent animated={true} backgroundColor={'#DB4D37'} barStyle={'default'} />
    </View>

  )
}

export default function App() {
  useEffect(() => {
    permissaoNotificacao()
    // getApiToken().then(function (res) {
    //   const accesstoken = res.access_token
    //   AsyncStorage.setItem('@apitoken:key', accesstoken)
    //   console.log('Token salvo com sucesso no AsyncStorage')
    // })
    bootstrap().catch(console.error)
  }, [])

  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold, Roboto_900Black, Inter_400Regular, Inter_700Bold, Inconsolata_400Regular, Inconsolata_500Medium, Inconsolata_600SemiBold, Poppins_500Medium })
  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider theme={THEME} //onLayout={onLayoutRootView}
    > 
      <AuthProvider>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef} >
            <CustomStatusBar backgroundColor={THEME.colors.ter} />
            <Routes />
          </NavigationContainer>
        </SafeAreaProvider>
      </AuthProvider>
    </NativeBaseProvider>
  )
}