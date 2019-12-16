import moment from 'moment';
import {
  CREATE_CLASS,
  CREATE_HOMEWORK
} from './types';

export const createClass = (values) => {
  const daysOfWeek = findDaysOfWeek(values.daysOfWeek);
  const classDays = findClassDays(daysOfWeek, values.firstDayOfClass, values.lastDayOfClass);
  return {
    type: CREATE_CLASS,
    payload: values,
    daysOfWeek,
    classDays
  };
};

export const createHomework = (values, state, classes) => { //need classes for the class days
  const dueDate = findDueDate(state, values.class, classes);
  console.log(moment(dueDate).format('MMM DD YYYY h:mm a'));
  //const reminders = scheduleReminders();
  return {
    type: CREATE_HOMEWORK,
    values,
    state,
    dueDate,
    //reminders
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

function findClassDays(daysOfWeek, firstDay, lastDay) {
  let classDays = [];
  const rangeDates = getDates(firstDay, lastDay);
  classDays = rangeDates.filter(f => daysOfWeek.some((d) => days[d] === f.getDay()));
  return classDays;
}

function getDates(startDate, stopDate) {
  const dateArray = [];
  let currentDate = new Date(startDate);
  while (currentDate <= stopDate) {
      dateArray.push(new Date(currentDate));
      currentDate = currentDate.addDays(1); //try taking this out (just need to advance the day one)
  }
  return dateArray;
}
/*eslint-disable no-extend-native*/
//eslint-disable-next-line no-shadow
Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
/*eslint-enable no-extend-native*/

//find due date for Homework
function findDueDate(state, className, classes) {
  if (state.dueNextClass) {
    const targetClass = classes.find((c) => c.name === className);
    const dueDay = targetClass.classDays.find((day) =>
      moment(day).isSame(moment(new Date(), 'day')) ||
      moment(day).isAfter(moment(new Date(), 'day'))
    );
    const dueDate = moment(dueDay) //takes the right day and applies the class time so it's due at correct
      .hour(moment(targetClass.classStartTime).hour()) //day and time of class start
      .minute(moment(targetClass.classStartTime).minute());
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
function scheduleReminders() {
  
}
