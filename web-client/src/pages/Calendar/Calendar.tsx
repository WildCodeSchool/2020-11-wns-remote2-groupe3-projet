import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import './calendar.scss';
import moment from 'moment';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { start } from 'repl';

type Appointement = {
  title: string;
  start_at: string;
  end_at: string;
  color: string;
  status: string;
};

const GETAPPOINTEMENTS = gql`
  query {
    appointements {
      id
      status
      start_at
      end_at
      title
    }
  }
`;

const Calendar = (): JSX.Element => {
  const { loading, data } = useQuery(GETAPPOINTEMENTS);

  useEffect(() => {
    if (data) {
      const result = data.appointements;
      console.log('data array', result);
      formatEvents();
    }
  }, [data]);

  const handleDateClick = (arg: any) => {
    alert(arg.dateStr);
  };

  const formatEvents = () => {
    const events = data.appointements;
    if (events) {
      console.log('events', events);
      return events.map((appointment: Appointement) => {
        const { title, end_at, start_at } = appointment;
        const endTime = new Date(parseInt(end_at));
        const startTime = new Date(parseInt(start_at));
        console.log(startTime);
        return {
          title,
          start: startTime,
          end: endTime,
          extendedProps: { ...appointment },
        };
      });
    }
  };

  if (loading) return <div>Loading ...</div>;

  return (
    <div className="CalendarPage">
      <FullCalendar
        plugins={[dayGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        dateClick={handleDateClick}
        displayEventTime={true}
        selectable={true}
        events={formatEvents()}
      />
    </div>
  );
};

export default Calendar;
