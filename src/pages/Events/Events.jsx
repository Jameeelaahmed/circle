import { useState, useEffect } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
  createViewMonthAgenda,
} from "@schedule-x/calendar";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import "@schedule-x/theme-shadcn/dist/index.css";


import CalendarImg from "../../assets/images/calendar.png";
import PollContainer from "../../components/ui/Modal/Poll/PollContainer";

export default function Events() {
  const [categoryColors, setCategoryColors] = useState({});

  useEffect(() => {
    const getCSSVar = (name) => {
      const value = getComputedStyle(document.documentElement).getPropertyValue(name);
      return value ? value.trim() : "";
    };

    setCategoryColors({
      Meeting: getCSSVar("--color-primary") || "#ff6b8b",
      Design: getCSSVar("--color-secondary") || "#6a5acd",
      Workshop: getCSSVar("--color-accent") || "#00c9b1",
      Deadline: getCSSVar("--color-darker") || "#0b0c10",
    });
  }, []);

  // Call hooks in same order, no early returns!
  const calendarApp = useCalendarApp({
    isDark: true,
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    selectedDates: "2025-07-12",
    plugins: [createEventModalPlugin(), createDragAndDropPlugin()],
    calendars: {
      Meeting: { colorName: "Meeting" },
      Design: { colorName: "Design" },
      Workshop: { colorName: "Workshop" },
      Deadline: { colorName: "Deadline" },
    },
    events: [
      { title: "Meeting with Mr. boss", start: "2025-07-12 09:00", end: "2025-07-12 10:00", id: "m1", calendarId: "Meeting" },
      { title: "Team Sync-up", start: "2025-07-12 11:00", end: "2025-07-12 11:30", id: "m2", calendarId: "Meeting" },
      { title: "UI Design Review", start: "2025-07-12 12:00", end: "2025-07-12 13:00", id: "d1", calendarId: "Design" },
      { title: "Design Brainstorming", start: "2025-07-12 14:00", end: "2025-07-12 15:00", id: "d2", calendarId: "Design" },
      { title: "React Workshop", start: "2025-07-12 15:30", end: "2025-07-12 17:00", id: "w1", calendarId: "Workshop" },
      { title: "Advanced JS Workshop", start: "2025-07-12 17:30", end: "2025-07-12 19:00", id: "w2", calendarId: "Workshop" },
      { title: "Submit Project Proposal", start: "2025-07-12 23:59", end: "2025-07-13 00:00", id: "dl1", calendarId: "Deadline" },
    ],
  });

  if (Object.keys(categoryColors).length === 0)
    return <div style={{ color: "#c5c6c7", background: "#0b0c10", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>;

  return (
    <>
      <PollContainer />
      <div
        className="mt-15 flex h-screen w-full flex-col gap-6 overflow-hidden px-6 py-6"
        style={{
          backgroundColor: "#0b0c10",
          color: "#c5c6c7",
        }}
      >
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <img src={CalendarImg} alt="Calendar" className="h-10 w-10" />
            <div>
              <h1 className="text-3xl font-bold text-white">Calendar</h1>
              <p className="text-sm text-gray-400">7 Events in July</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.entries(categoryColors).map(([category, color]) => (
              <span
                key={category}
                className="rounded-full border px-3 py-1 text-sm font-medium"
                style={{
                  backgroundColor: color + "25",
                  borderColor: color + "55",
                  color,
                  borderStyle: "solid",
                  borderWidth: "1px",
                }}
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        <div
          className="relative z-10 flex-grow overflow-auto rounded-2xl shadow-md"
          style={{
            backgroundColor: "#12131a",
            border: "1px solid #0b0c10",
          }}
        >
          <ScheduleXCalendar calendarApp={calendarApp} />
        </div>
      </div>
    </>
  );
}
