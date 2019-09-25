import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import firebase from 'firebase';
import '@firebase/firestore';

export async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (finalStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') { return false; }

  // Get the token that uniquely identifies this device
  try {
    const token = await Notifications.getExpoPushTokenAsync();
    const uid = await firebase.auth().currentUser.uid;

    // post notification token to firestore
    global.dbRoot.doc(uid).set({ expoPushNotificationsToken: token }, { merge: true });
  } catch (e) {
    console.log(e);
  }
  return true;
}
