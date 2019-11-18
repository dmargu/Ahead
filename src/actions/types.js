export const OPEN_ITEM_MODAL = 'openItemModal';

export const CLOSE_ITEM_MODAL = 'closeItemModal';

export const ADD_TODO = 'addTodo';

export const TOGGLE_TODO = 'toggleTodo';

export const REMOVE_TODO = 'removeTodo';

export const CHANGE_DATE = 'changeDate';

export const CLEAR_DATE = 'clearDate';

export const TOGGLE_REMINDERS = 'toggleReminders';

export const TEN_MIN_REMINDER = 'tenMinReminder';

export const THIRTY_MIN_REMINDER = 'thirtyMinReminder';

export const ONE_HOUR_REMINDER = 'oneHourReminder';

export const ONE_DAY_REMINDER = 'oneDayReminder';

export const START_REMINDER = 'startReminder';

export const CHANGE_NOTES = 'changeNotes';

export const EMAIL_CHANGED = 'emailChanged';

export const PASSWORD_CHANGED = 'passwordChanged';

export const USER_LOGIN_SUCCESS = 'userLoginSuccess';

export const USER_LOGIN_FAIL = 'userLoginFail';

export const LOGIN_USER = 'loginUser';

export const LOGOUT_USER = 'logoutUser';

export const TOGGLE_NOTES_MODAL = 'OpenNotesModal';

export const TOGGLE_DATE_MODAL = 'toggleDateModal';

export const ADD_NOTIFICATION_ID = 'addNotifiactionID';
                                                        //cancels individual notification and makes that
export const CANCEL_NOTIFICATION = 'cancelNotification'; //notification inactive

export const CANCEL_ALL_NOTIFICATIONS = 'cancelAllNotifications'; //deletes all notifications for item
//also conditionally checks if it's clear date (true or false) and if true makes reminders inactive
export const RESCHEDULE_NOTIFICATIONS = 'rescheduleNotifications'; //reschedules active notifs after change
