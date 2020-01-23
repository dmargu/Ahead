import moment from 'moment';
import { Notifications } from 'expo';
import shortid from 'shortid';
import {
  CREATE_CLASS,
  CREATE_HOMEWORK,
  CREATE_TEST,
  ADD_NOTIFICATION_ID,
  TOGGLE_CREATE_CLASS_MODAL,
  TOGGLE_CREATE_HOMEWORK_MODAL,
  TOGGLE_CREATE_TEST_MODAL,
  REMOVE_HOMEWORK,
  REMOVE_TEST,
  REMOVE_CLASS,
  CHANGE_LOCATION,
  CHANGE_OFFICE_HOURS,
  TOGGLE_ITEM_STUDY_DAY,
  CANCEL_ALL_NOTIFICATIONS,
  TOGGLE_AFTER_CLASS_REMINDERS,
  REMOVE_CLASS_DAY,
  TOGGLE_STUDY_REMINDER,
  CHANGE_CLASS_NAME,
  CHANGE_HOMEWORK_NAME,
  CHANGE_TEST_NAME
} from './types';
import { scheduleNotification } from '../functions/ScheduleNotification';

export const createClass = (values, actions) => { //add after class notifications
  return async (dispatch) => {
    const id = shortid.generate(); //generating id now se we can use it to schedule reminders
    const daysOfWeek = findDaysOfWeek(values.daysOfWeek);
    const classDays = findClassDays(values, daysOfWeek);
    if (values.afterClassReminders) {
      await scheduleClassReminders(dispatch, values, classDays, id);
    }
    dispatch({
      type: CREATE_CLASS,
      payload: values,
      daysOfWeek,
      classDays,
      id
    });
    actions.setSubmitting(false);
    dispatch({
      type: TOGGLE_CREATE_CLASS_MODAL
    });
  };
};

export const createHomework = (values, state, classes, actions) => {
  return async (dispatch) => {
    const id = shortid.generate(); //generating id now se we can use it to schedule reminders
    const dueDate = findDueDate(state, values.class, classes);
    const reminders = await scheduleReminders(dispatch, state, dueDate, id, values);
    dispatch({
      type: CREATE_HOMEWORK,
      values,
      state,
      id,
      dueDate,
      reminders
    });
    actions.setSubmitting(false);
    dispatch({
      type: TOGGLE_CREATE_HOMEWORK_MODAL
    });
  };
};

export const createTest = (values, state, classes, actions) => {
  return async (dispatch) => {
    const id = shortid.generate(); //generating id now se we can use it to schedule reminders
    dispatch({
      type: CREATE_TEST,
      values,
      state,
      id,
    });
    actions.setSubmitting(false);
    dispatch({
      type: TOGGLE_CREATE_TEST_MODAL
    });
  };
};

export const removeHomework = (item) => {
  return {
    type: REMOVE_HOMEWORK,
    id: item.id
  };
};

export const removeTest = (item) => {
  return {
    type: REMOVE_TEST,
    id: item.id
  };
};

export const removeClass = (item) => {
  return {
    type: REMOVE_CLASS,
    id: item.id
  };
};

export const changeLocation = (item, text) => {
  return {
    type: CHANGE_LOCATION,
    id: item.id,
    payload: text
  };
};

export const changeOfficeHours = (item, text) => {
  return {
    type: CHANGE_OFFICE_HOURS,
    id: item.id,
    payload: text
  };
};

export const changeItemName = (item, text) => {
  return {
    type: CHANGE_CLASS_NAME,
    id: item.id,
    payload: text
  };
};

export const changeHomeworkName = (item, text) => {
  return {
    type: CHANGE_HOMEWORK_NAME,
    id: item.id,
    payload: text
  };
};

export const changeTestName = (item, text) => {
  return {
    type: CHANGE_TEST_NAME,
    id: item.id,
    payload: text
  };
};

export const toggleItemStudyDay = (item, day) => {
  return {
    type: TOGGLE_ITEM_STUDY_DAY,
    id: item.id,
    payload: day
  };
};

export const scheduleAfterClassReminders = (item, makeSwitchVisible) => {
  return async (dispatch) => {
    await scheduleClassReminders(dispatch, item, item.classDays, item.id);
    dispatch({
      type: TOGGLE_AFTER_CLASS_REMINDERS,
      id: item.id,
      payload: true
    });
    makeSwitchVisible();
  };
};

export const cancelAfterClassReminders = (item, makeSwitchVisible, notificationIDs) => {
  return async (dispatch) => {
    const notificationData = notificationIDs.filter(
      obj => (obj.itemID === item.id && obj.reminderType === 'afterClassReminder')
    );
    if (notificationData) {
      for (let x = 0; x < notificationData.length; x++) {
          await Notifications.cancelScheduledNotificationAsync(notificationData[x].notificationID);
      }
      const newList = notificationIDs.filter(obj => obj.itemID !== item.id);
      dispatch({
        type: CANCEL_ALL_NOTIFICATIONS,
        newList,
        id: item.id
      });
    }
    if (makeSwitchVisible !== null) {
      dispatch({
        type: TOGGLE_AFTER_CLASS_REMINDERS,
        id: item.id,
        payload: false
      });
      makeSwitchVisible();
    }
  };
};

export const removeClassDay = (item) => {
  return {
    type: REMOVE_CLASS_DAY,
    id: item.id
  };
};

export const toggleStudyReminder = (item) => {
  return {
    type: TOGGLE_STUDY_REMINDER,
    id: item.test.id,
    studyType: item.type
  };
};

//HELPER FUNCTIONS START HERE

//days of week
function findDaysOfWeek(daysOfWeek) {
  const daysArray = [];
  if (daysOfWeek.m) {
    daysArray.push('Mon');
  }
  if (daysOfWeek.t) {
    daysArray.push('Tue');
  }
  if (daysOfWeek.w) {
    daysArray.push('Wed');
  }
  if (daysOfWeek.r) {
    daysArray.push('Thu');
  }
  if (daysOfWeek.f) {
    daysArray.push('Fri');
  }
  if (daysOfWeek.sa) {
    daysArray.push('Sat');
  }
  if (daysOfWeek.su) {
    daysArray.push('Sun');
  }
  return daysArray;
}
//find class days
const days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

function findClassDays(values, daysOfWeek) {
  let classDays = [];
  const rangeDates = getDates(values.firstDayOfClass, values.lastDayOfClass);
  classDays = rangeDates.filter(dayInRange => daysOfWeek.some((d) => days[d] === dayInRange.getDay()));
  for (let x = 0; x < classDays.length; x++) { //this loop gives the days the correct start time
    classDays[x] = moment(classDays[x]) //so it will appear at the right time it should be scheduled
      .hour(moment(values.classStartTime).hour())
      .minute(moment(values.classStartTime).minute());
  }
  return classDays;
}

function getDates(startDate, stopDate) { //helper function to populate range of possible dates
  const dateArray = [];
  let currentDate = new Date(startDate);
  while (currentDate <= stopDate) {
      dateArray.push(new Date(currentDate));
      currentDate = moment(currentDate).add(1, 'days');
  }
  return dateArray;
}

async function scheduleClassReminders(dispatch, values, classDates, id) {
  for (let x = 0; x < classDates.length; x++) {
    if (moment(classDates[x]).hour(moment(values.classEndTime).hour())
      .minute(moment(values.classEndTime).minute())
      .subtract(10, 'minutes')
      .isAfter(new Date())) {
      const notificationID =
        await scheduleNotification.afterClassReminder(classDates[x], values.classEndTime, values.name);
      dispatch({
        type: ADD_NOTIFICATION_ID,
        id,
        reminderType: 'afterClassReminder',
        notificationID
      });
    }
  }
}

//find due date for Homework
function findDueDate(state, className, classes) {
  if (state.dueNextClass) {
    const targetClass = classes.find((c) => c.name === className); //dueDate is next class after today
    const dueDate = targetClass.classDays.find((day) => moment(day).isAfter(moment(new Date(), 'day')));
    return dueDate;
  } else if (state.dueNightBefore) {
    const targetClass = classes.find((c) => c.name === className);
    const classDue = targetClass.classDays.find((day) => moment(day).isAfter(moment(new Date(), 'day')));
    const rightDueDayWrongTime = moment(classDue).subtract(1, 'days'); //finds next class and makes it
    const dueDate = moment(rightDueDayWrongTime).hour(23).minute(59); //night before at 11:59pm
    return dueDate;
  } else if (state.dueCustomTime) { //if custom date they enter date and time and we take that state
    const dueDate = state.customDueDate; //and just return it
    return dueDate;
  }
  return null; //if no due date was set return null
}

//schedule reminders
async function scheduleReminders(dispatch, state, dueDate, id, values) {
  const reminders = {
    oneDay: false, twoDay: false, threeDay: false, custom: false, customTime: null
  };
  if (state.oneDayReminder &&
    (moment(dueDate).subtract(1, 'days').isAfter(moment(new Date())) || //check if duedate is at least
     moment(dueDate).subtract(1, 'days').isSame(moment(new Date())) //1 day away, same for 2 and 3
    )
    ) {
    const notificationID = await scheduleNotification.homeworkReminder(dueDate, 'oneDay', values);
    dispatch({
      type: ADD_NOTIFICATION_ID,
      id,
      reminderType: 'oneDay', //use these keys to cancel them from homework item
      notificationID
    });
    reminders.oneDay = true;
  }
  if (state.twoDayReminder &&
    (moment(dueDate).subtract(2, 'days').isAfter(moment(new Date())) ||
     moment(dueDate).subtract(2, 'days').isSame(moment(new Date()))
    )
    ) {
    const notificationID = await scheduleNotification.homeworkReminder(dueDate, 'twoDay', values);
    dispatch({
      type: ADD_NOTIFICATION_ID,
      id,
      reminderType: 'twoDay',
      notificationID
    });
    reminders.twoDay = true;
  }
  if (state.threeDayReminder &&
    (moment(dueDate).subtract(3, 'days').isAfter(moment(new Date())) ||
     moment(dueDate).subtract(3, 'days').isSame(moment(new Date()))
    )
    ) {
    const notificationID = await scheduleNotification.homeworkReminder(dueDate, 'threeDay', values);
    dispatch({
      type: ADD_NOTIFICATION_ID,
      id,
      reminderType: 'threeDay',
      notificationID
    });
    reminders.threeDay = true;
  }
  if (state.customReminder) {
    const notificationID =
      await scheduleNotification.customHomeworkReminder(state.customReminderDate, values);
    dispatch({
      type: ADD_NOTIFICATION_ID,
      id,
      reminderType: 'custom',
      notificationID
    });
    reminders.custom = true;
    reminders.customTime = state.customReminderDate;
  }
  return reminders;
}
