import storeConfiguration from '../store';

function cancelSingleNotification(item, reminderType) {
  const { store } = storeConfiguration();
  const notificationIDs = store.getState().StorageReducer.notificationIDs;
  console.log(notificationIDs);
  /*const notificationData = notificationIDs.find(
    obj => (obj.itemID === item.id && obj.reminderType === reminderType)
  );
  console.log(notificationData);
  return notificationData;*/
}

export default cancelSingleNotification;


case CANCEL_NOTIFICATION: { //works perfectly if different session, same session doesn't work
  console.log(state.notificationIDs);
  const notificationData = state.notificationIDs.find(
    obj => (obj.itemID === action.id && obj.reminderType === action.reminderType)
  ); //notification data will turn up undefined even though it is in the redux store. makes no sense.
  if (notificationData) {
    Notifications.cancelScheduledNotificationAsync(notificationData.notificationID);
    console.log('it worked');
    console.log(notificationData);
    const newList = state.notificationIDs.filter(obj => obj !== notificationData);
    return { notificationIDs: newList };
  }
  console.log('did not work');
  return { ...state };
}
