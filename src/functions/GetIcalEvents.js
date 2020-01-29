import * as Calendar from 'expo-calendar';
import moment from 'moment';

export async function getIcalEvents() {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  const iCalEvents = [];
  let sourceID;
  let localiCalID;
  if (status === 'granted') {
      const calendars = await Calendar.getCalendarsAsync(); //caldav calendar will contain the sourceID
      const caldavCalendar = calendars.find(calendar => calendar.source.type === 'caldav');
      if (caldavCalendar) {
        sourceID = caldavCalendar.source.id;
      }
      const localCalendar = calendars.find(calendar => calendar.title === 'Ahead');
      if (localCalendar) {
        localiCalID = localCalendar.id;
      }

      const calsWithoutAhead = calendars.filter(calendar => calendar.title !== 'Ahead');
      const calendarIds = []; //add those events to our app (would just be duplicates)
      for (let x = 0; x < calsWithoutAhead.length; x++) {
        calendarIds.push(calsWithoutAhead[x].id);
      }
      const events = await Calendar.getEventsAsync(
        calendarIds, moment(new Date()).subtract(1, 'months').toDate()
        , moment(new Date()).add(1, 'years').toDate()
      );

      for (let x = 0; x < events.length; x++) {
        iCalEvents.push({
          text: events[x].title,
          id: events[x].id,
          date: events[x].startDate,
          notes: events[x].notes,
        });
      }
    }
    return { iCalEvents, sourceID, localiCalID };
}
