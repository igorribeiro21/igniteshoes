import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';
import { useEffect, useState } from 'react';
import { NotificationWillDisplayEvent, OSNotification, OneSignal } from 'react-native-onesignal';
import { Notification } from '../components/Notification';
import { OSNotificationNew } from '../components/Notification';

const linking = {
  prefixes: ['com.igniteshoes://','igniteshoesapp://','exp+igniteshoesapp://'],
  config: {
    screens: {
      details: {
        path: 'details/:productId',
        parse: {
          productId: (productId: string) => productId
        }
      }
    }
  }
}

export function Routes() {
  const [notification, setNotification] = useState<OSNotificationNew | undefined>();
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    OneSignal.Notifications.addEventListener('foregroundWillDisplay', (notificationReceivedEvent: NotificationWillDisplayEvent) => {
      console.log('foregroundWillDisplay')
      console.log('notificationReceivedEvent.notification',notificationReceivedEvent.notification)
      const response = notificationReceivedEvent.getNotification() as OSNotificationNew;
      
      setNotification(response);
    });

    OneSignal.Notifications.addEventListener('click',(e) => {
      const notification = e.notification as unknown as OSNotificationNew;
      console.log('Clique evento',notification);
      console.log('Clique evento launcheUrl',notification.launchUrl);
    })
  }, []);

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />

      {
        notification?.title &&
        <Notification
          data={notification}
          onClose={(() => { setNotification(undefined) })}
        />}
    </NavigationContainer>
  );
}