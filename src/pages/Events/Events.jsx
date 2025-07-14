import React from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
  createViewMonthAgenda,
} from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";

import CalendarImg from "../../assets/images/calendar.png";

import { COLORS } from '../../constants';

const categoryColors = {
  Meeting: COLORS.primary,   // pink-ish
  Design: COLORS.secondary,  // purple-ish
  Workshop: COLORS.accent,   // teal-ish
  Deadline: COLORS.darker,   // very dark
};

const config = {
  calendars: {
    Meeting: {
      colorName: 'Meeting',
      lightColors: {
        main: COLORS.primary,       // pink-ish
        container: '#ffe6eb',
        onContainer: '#660024',
      },
      darkColors: {
        main: COLORS.primary,
        container: '#330012',
        onContainer: '#ffb3c6',
      },
    },
    Design: {
      colorName: 'Design',
      lightColors: {
        main: COLORS.secondary,     // purple-ish
        container: '#e6e0ff',
        onContainer: '#2a005c',
      },
      darkColors: {
        main: COLORS.secondary,
        container: '#1a0033',
        onContainer: '#bfb3ff',
      },
    },
    Workshop: {
      colorName: 'Workshop',
      lightColors: {
        main: COLORS.accent,        // teal-ish
        container: '#d0fff9',
        onContainer: '#004d4d',
      },
      darkColors: {
        main: COLORS.accent,
        container: '#004d4d',
        onContainer: '#b3ffff',
      },
    },
    Deadline: {
      colorName: 'Deadline',
      lightColors: {
        main: COLORS.darker,        // very dark
        container: '#666666',
        onContainer: '#f0f0f0',
      },
      darkColors: {
        main: COLORS.darker,
        container: '#333333',
        onContainer: '#e0e0e0',
      },
    },
  },

  events: [
    // Meetings
    {
      title: "Meeting with Mr. boss",
      start: "2025-07-12 09:00",
      end: "2025-07-12 10:00",
      id: "m1",
      calendarId: "Meeting",
    },
    {
      title: "Team Sync-up",
      start: "2025-07-12 11:00",
      end: "2025-07-12 11:30",
      id: "m2",
      calendarId: "Meeting",
    },

    // Design
    {
      title: "UI Design Review",
      start: "2025-07-12 12:00",
      end: "2025-07-12 13:00",
      id: "d1",
      calendarId: "Design",
    },
    {
      title: "Design Brainstorming",
      start: "2025-07-12 14:00",
      end: "2025-07-12 15:00",
      id: "d2",
      calendarId: "Design",
    },

    // Workshop
    {
      title: "React Workshop",
      start: "2025-07-12 15:30",
      end: "2025-07-12 17:00",
      id: "w1",
      calendarId: "Workshop",
    },
    {
      title: "Advanced JS Workshop",
      start: "2025-07-12 17:30",
      end: "2025-07-12 19:00",
      id: "w2",
      calendarId: "Workshop",
    },

    // Deadline
    {
      title: "Submit Project Proposal",
      start: "2025-07-12 23:59",
      end: "2025-07-13 00:00",
      id: "dl1",
      calendarId: "Deadline",
    },
  ],
};


export default function Events() {
  const events = config.events;
  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events,
    calendars: config.calendars,
    selectedDates: "2025-07-12",
    plugins: [createEventModalPlugin(), createDragAndDropPlugin()],
  });

  return (
    <div className="h-screen mt-15 w-full bg-gray-100 px-6 py-6 flex flex-col gap-6 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Title */}
        <div className="flex items-center gap-4">
          <img src={CalendarImg} alt="Calendar" className="w-10 h-10" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Calendar</h1>
            <p className="text-sm text-gray-500">12 Events in July</p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(categoryColors).map(([category, color]) => (
            <span
              key={category}
              className="px-3 py-1 text-sm rounded-full border font-medium"
              style={{
                backgroundColor: `${color}15`, 
                borderColor: `${color}30`,
                color: color,
                borderStyle: 'solid',
                borderWidth: '1px',
              }}
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      {/* Calendar */}
      <div className="flex-grow bg-white border border-gray-200 rounded-2xl shadow-md relative z-10 overflow-auto">
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
    </div>
  );
}
