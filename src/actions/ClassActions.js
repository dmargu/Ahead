import moment from 'moment';
import shortid from 'shortid';
import {
  CREATE_CLASS,
  CREATE_HOMEWORK,
  ADD_NOTIFICATION_ID
} from './types';
import { scheduleNotification } from '../functions/ScheduleNotification';

export const createClass = (values) => {
  const daysOfWeek = findDaysOfWeek(values.daysOfWeek);
  const classDays = findClassDays(values, daysOfWeek);
  return {
    type: CREATE_CLASS,
    payload: values,
    daysOfWeek,
    classDays
  };
};

export const createHomework = (values, state, classes) => {
  const id = shortid.generate(); //generating id now se we can use it to schedule reminders
  const dueDate = findDueDate(state, values.class, classes);
  const reminders = scheduleReminders(state, dueDate, id, values);
  return {
    type: CREATE_HOMEWORK,
    values,
    state,
    id,
    dueDate,
    reminders
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
function scheduleReminders(state, dueDate, id, values) {
  return async (dispatch) => {
    if (state.oneDayReminder) {
      const notificationID = await scheduleNotification.homeWorkReminder(dueDate, 'oneDay', values);
      dispatch({
        type: ADD_NOTIFICATION_ID,
        id,
        reminderType: 'homeworkOneDay', //use these keys to cancel them from homework item
        notificationID
      });
    }
    if (state.twoDayReminder) {
      const notificationID = await scheduleNotification.homeWorkReminder(dueDate, 'twoDay', values);
      dispatch({
        type: ADD_NOTIFICATION_ID,
        id,
        reminderType: 'homeworkTwoDay',
        notificationID
      });
    }
    if (state.threeDayReminder) {
      const notificationID = await scheduleNotification.homeWorkReminder(dueDate, 'threeDay', values);
      dispatch({
        type: ADD_NOTIFICATION_ID,
        id,
        reminderType: 'homeworkThreeDay',
        notificationID
      });
    }
    if (state.customReminder) {
      const notificationID = await scheduleNotification.homeWorkReminder(dueDate, 'custom', values);
      dispatch({
        type: ADD_NOTIFICATION_ID,
        id,
        reminderType: 'homeworkCustom',
        notificationID
      });
    }
  };
}
