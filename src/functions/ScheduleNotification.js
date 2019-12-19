import { Notifications } from 'expo';
import { Alert } from 'react-native';
import moment from 'moment';
import { registerForPushNotificationsAsync } from './pushNotificationsRegister';

export const scheduleNotification = {
  async startReminder(item) {
    const permission = await registerForPushNotificationsAsync();
    if (permission) {
        const notificationID = await Notifications.scheduleLocalNotificationAsync(
          (item.notes ?
            {
              title: 'Reminder:',
              body: `${item.text} now\nNotes: ${item.notes}`
            }
            :
            {
              title: 'Reminder:',
              body: `${item.text} now`
            }
          ),
          {
            time: item.date
          }
        );
        return notificationID;
    }
    Alert.alert(
      'Cannot send notification without permission.',
      null,
      [
        { text: 'OK' }
      ],
        { cancelable: false }
    );
  },
  async tenMinReminder(item) {
    const permission = await registerForPushNotificationsAsync();
    if (permission) {
      const notificationID = await Notifications.scheduleLocalNotificationAsync(
        (item.notes ?
          {
            title: 'Reminder:',
            body: `${item.text} in ten minutes\nNotes: ${item.notes}`
          }
          :
          {
            title: 'Reminder:',
            body: `${item.text} in ten minutes`
          }
        ),
        {
          time: moment(item.date).subtract(10, 'minutes').toDate()
        }
      );
      return notificationID;
    }
    Alert.alert(
      'Cannot send notification without permission.',
      null,
      [
        { text: 'OK' }
      ],
        { cancelable: false }
    );
  },
  async thirtyMinReminder(item) {
    const permission = await registerForPushNotificationsAsync();
    if (permission) {
      const notificationID = await Notifications.scheduleLocalNotificationAsync(
        (item.notes ?
          {
            title: 'Reminder:',
            body: `${item.text} in thirty minutes\nNotes: ${item.notes}`
          }
          :
          {
            title: 'Reminder:',
            body: `${item.text} in thirty minutes`
          }
        ),
        {
          time: moment(item.date).subtract(30, 'minutes').toDate()
        }
      );
      return notificationID;
    }
    Alert.alert(
      'Cannot send notification without permission.',
      null,
      [
        { text: 'OK' }
      ],
        { cancelable: false }
    );
  },
  async oneHourReminder(item) {
    const permission = await registerForPushNotificationsAsync();
    if (permission) {
      const notificationID = await Notifications.scheduleLocalNotificationAsync(
        (item.notes ?
          {
            title: 'Reminder:',
            body: `${item.text} in one hour\nNotes: ${item.notes}`
          }
          :
          {
            title: 'Reminder:',
            body: `${item.text} in one hour`
          }
        ),
        {
          time: moment(item.date).subtract(1, 'hour').toDate()
        }
      );
      return notificationID;
    }
    Alert.alert(
      'Cannot send notification without permission.',
      null,
      [
        { text: 'OK' }
      ],
        { cancelable: false }
    );
  },
  async oneDayReminder(item) {
    const permission = await registerForPushNotificationsAsync();
    if (permission) {
      const notificationID = await Notifications.scheduleLocalNotificationAsync(
        (item.notes ?
          {
            title: 'Reminder:',
            body: `${item.text} in one day\nNotes: ${item.notes}`
          }
          :
          {
            title: 'Reminder:',
            body: `${item.text} in one day`
          }
        ),
        {
          time: moment(item.date).subtract(1, 'days').toDate()
        }
      );
      return notificationID;
    }
    Alert.alert(
      'Cannot send notification without permission.',
      null,
      [
        { text: 'OK' }
      ],
        { cancelable: false }
    );
  },
  async homeworkReminder(dueDate, type, values) {
    const permission = await registerForPushNotificationsAsync();
    if (permission) {
      switch (type) {
        case 'oneDay': {
          const notificationID = await Notifications.scheduleLocalNotificationAsync(
            (values.notes ?
              {
                title: 'Reminder:',
                body: `${values.assignmentName} due in one day\nNotes: ${values.notes}`
              }
              :
              {
                title: 'Reminder:',
                body: `${values.assignmentName} due in one day`
              }
            ),
            {
              time: moment(dueDate).subtract(1, 'days').toDate()
            }
          );
          return notificationID;
        }
        case 'twoDay': {
          const notificationID = await Notifications.scheduleLocalNotificationAsync(
            (values.notes ?
              {
                title: 'Reminder:',
                body: `${values.assignmentName} due in two days\nNotes: ${values.notes}`
              }
              :
              {
                title: 'Reminder:',
                body: `${values.assignmentName} due in two days`
              }
            ),
            {
              time: moment(dueDate).subtract(2, 'days').toDate()
            }
          );
          return notificationID;
        }
        case 'threeDay': {
          const notificationID = await Notifications.scheduleLocalNotificationAsync(
            (values.notes ?
              {
                title: 'Reminder:',
                body: `${values.assignmentName} due in three days\nNotes: ${values.notes}`
              }
              :
              {
                title: 'Reminder:',
                body: `${values.assignmentName} due in three days`
              }
            ),
            {
              time: moment(dueDate).subtract(3, 'days').toDate()
            }
          );
          return notificationID;
        }
        default:
          return;
      }
    }
    Alert.alert(
      'Cannot send notification without permission.',
      null,
      [
        { text: 'OK' }
      ],
        { cancelable: false }
    );
  },
  async customHomeWorkReminder(reminderDate, values) {
    const permission = await registerForPushNotificationsAsync();
    if (permission) {
      const notificationID = await Notifications.scheduleLocalNotificationAsync(
        (values.notes ?
          {
            title: 'Reminder:',
            body: `Complete ${values.assignmentName}\nNotes: ${values.notes}`
          }
          :
          {
            title: 'Reminder:',
            body: `Complete ${values.assignmentName}`
          }
        ),
        {
          time: moment(reminderDate).toDate()
        }
      );
      return notificationID;
    }
    Alert.alert(
      'Cannot send notification without permission.',
      null,
      [
        { text: 'OK' }
      ],
        { cancelable: false }
    );
  },
  async afterClassReminder(classDate, classEndTime, className) {
    const permission = await registerForPushNotificationsAsync();
    if (permission) {
      const notificationID = await Notifications.scheduleLocalNotificationAsync(
        {
          title: `Do you have homework for ${className}?`,
          body: 'Tap to enter it',
          data: {
            type: 'afterClassReminder',
            className
          }
        },
        {
          time: moment(classDate)
            .hour(moment(classEndTime).hour())
            .minute(moment(classEndTime).minute())
            .subtract(10, 'minutes') //send the notification 10 minutes before end of class
            .toDate()
        }
      );
      return notificationID;
    }
    Alert.alert(
      'Cannot send notification without permission.',
      null,
      [
        { text: 'OK' }
      ],
        { cancelable: false }
    );
  }
};
