import moment from 'moment';
import shortid from 'shortid';
import {
  CREATE_CLASS,
  CREATE_HOMEWORK,
  ADD_NOTIFICATION_ID,
  TOGGLE_CREATE_CLASS_MODAL,
  TOGGLE_CREATE_HOMEWORK_MODAL,
  REMOVE_HOMEWORK
} from './types';
import { scheduleNotification } from '../functions/ScheduleNotification';

export const createClass = (values, actions) => { //add after class notifications
  return async (dispatch) => {
    const id = shortid.generate(); //generating id now se we can use it to schedule reminders
    const daysOfWeek = findDaysOfWeek(values.daysOfWeek);
    const classDays = findClassDays(values, daysOfWeek);
    if (values.afterClassReminders) {
      await scheduleAfterClassReminders(dispatch, values, classDays, id);
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

export const removeHomework = (item) => {
  return {
    type: REMOVE_HOMEWORK,
    id: item.id
  };
};

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

async function scheduleAfterClassReminders(dispatch, values, classDates, id) {
  for (let x = 0; x < classDates.length; x++) {
    const notificationID =
      await scheduleNotification.afterClassReminder(classDates[x], values.classEndTime, values.className);
    dispatch({
      type: ADD_NOTIFICATION_ID,
      id,
      reminderType: 'afterclassReminder',
      notificationID
    });
  }
}

//find due date for Homework
function findDueDate(state, className, classes) {
  if (state.dueNextClass) {
    const targetClass = classes.find((c) => c.name === className);
    const dueDate = targetClass.classDays.find((day) =>
      moment(day).isSame(moment(new Date(), 'day')) ||
      moment(day).isAfter(moment(new Date(), 'day'))
    );
    return dueDate;
  } else if (state.dueNightBefore) {
    const targetClass = classes.find((c) => c.name === className);
    const classDue = targetClass.classDays.find((day) =>
      moment(day).isSame(moment(new Date(), 'day')) ||
      moment(day).isAfter(moment(new Date(), 'day'))
    );
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
    oneDay: false, twoDay: false, threeDay: false, custom: false
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
      reminderType: 'homeworkOneDay', //use these keys to cancel them from homework item
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
      reminderType: 'homeworkTwoDay',
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
      reminderType: 'homeworkThreeDay',
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
      reminderType: 'homeworkCustom',
      notificationID
    });
    reminders.custom = true;
  }
  return reminders;
}
