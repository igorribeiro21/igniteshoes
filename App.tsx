import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NotificationClickEvent, NotificationWillDisplayEvent, OneSignal } from 'react-native-onesignal';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { tagUserEmailCreate } from './src/notifications/notificationsTags';

import { CartContextProvider } from './src/contexts/CartContext';

OneSignal.initialize('9d081469-1f39-4d53-a13a-afeb611994d4');

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  // tagUserEmailCreate('igorapalvesribeiro@gmail.com');

  useEffect(() => {
    const unsubscribe = OneSignal.Notifications.addEventListener('click', (response: NotificationClickEvent) => {
      if (response.result) {
        const { actionId } = response.result;

        if (actionId) {
          switch (actionId) {
            case '1':
              return console.log('Ver todas');
            case '2':
              return console.log('Ver pedidos');
            default:
              return console.log('Não foi clicado em botão de ação')
          }
        }
      }

    });

    return () => unsubscribe;
  }, [])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}