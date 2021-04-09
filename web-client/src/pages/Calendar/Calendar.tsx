import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import './calendar.scss';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

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
    if (data) {
      console.log('events', data);
      getDateFromTimestamp();
    }
  };

  const getDateFromTimestamp = () => {
    const events = data.appointements;
    return events.map((appointment: Appointement) => {
      const { title, end_at, start_at } = appointment;
      const endTime = new Date(parseInt(end_at));
      const startTime = new Date(parseInt(start_at));
      return {
        title,
        start: startTime,
        end: endTime,
        extendedProps: { ...appointment },
      };
    });
  };

  if (loading) return <div>Loading ...</div>;

  return (
    <div className="CalendarPage">
      <div className="CalendarPage-header">
        <h1 className="CalendarPage-header-title">Calendar</h1>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, listPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        dateClick={handleDateClick}
        displayEventTime={true}
        selectable={true}
        events={getDateFromTimestamp()}
        // header={{
        //   left: 'prev,next',
        //   center: 'title',
        //   right: 'dayGridMonth,timeGridWeek,timeGridDay',
        // }}
      />
    </div>
  );
};

export default Calendar;
