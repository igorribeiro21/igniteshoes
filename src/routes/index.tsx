import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';
import { useEffect, useState } from 'react';
import { NotificationWillDisplayEvent, OSNotification, OneSignal } from 'react-native-onesignal';
import { Notification } from '../components/Notification';

export function Routes() {
  const [notification, setNotification] = useState<OSNotification | undefined>();
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    OneSignal.Notifications.addEventListener('foregroundWillDisplay', (notificationReceivedEvent: NotificationWillDisplayEvent) => {
      const response = notificationReceivedEvent.getNotification();

      setNotification(response);
    });
  }, []);

  return (
    <NavigationContainer theme={theme}>
      <AppRoutes />

      {
        notification?.title &&
        <Notification
          title={notification?.title}
          onClose={(() => { setNotification(undefined) })}
        />}
    </NavigationContainer>
  );
}