import * as Calendar from 'expo-calendar';
import moment from 'moment';

export async function getIcalEvents() {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  const iCalEvents = [];
  if (status === 'granted') {
      const calendars = await Calendar.getCalendarsAsync();
      const calendarIds = [];
      for (let x = 0; x < calendars.length; x++) {
        calendarIds.push(calendars[x].id);
      }
      const events = await Calendar.getEventsAsync(
        calendarIds, moment(new Date()).subtract(1, 'months').toDate()
        , moment(new Date()).add(1, 'years').toDate());

      for (let x = 0; x < events.length; x++) {
        iCalEvents.push({
          text: events[x].title,
          id: events[x].id,
          date: events[x].startDate,
          notes: events[x].notes
        });
      }
    }
    return iCalEvents;
}
