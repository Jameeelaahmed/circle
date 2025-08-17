import { useEffect, useState } from "react";
import { useCalendarApp } from "@schedule-x/react";
import {
    createViewDay,
    createViewWeek,
    createViewMonthGrid,
    createViewMonthAgenda,
} from "@schedule-x/calendar";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import "@schedule-x/theme-shadcn/dist/index.css";
import EventsPresentional from "./EventsPresentional";

import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";

export default function EventsContainer() {
    const [categoryColors, setCategoryColors] = useState({});
    const [events, setEvents] = useState([]);
    const [calendars, setCalendars] = useState({});

    // This hook is now at the top level and will always be called.
    const calendarApp = useCalendarApp({
        isDark: true,
        views: [
            createViewDay(),
            createViewWeek(),
            createViewMonthGrid(),
            createViewMonthAgenda(),
        ],
        selectedDate: new Date().toISOString().slice(0, 10),
        plugins: [createEventModalPlugin(), createDragAndDropPlugin()],
        calendars: calendars,
        events: events,
    });

    // Fetch CSS variable colors
    useEffect(() => {
        const getCSSVar = (name) =>
            getComputedStyle(document.documentElement).getPropertyValue(name)?.trim() || "";

        const colors = {
            Meeting: getCSSVar("--color-primary") || "#ff6b8b",
            Design: getCSSVar("--color-secondary") || "#6a5acd",
            Workshop: getCSSVar("--color-accent") || "#00c9b1",
            Deadline: getCSSVar("--color-main") || "#0b0c10",
        };

        setCategoryColors(colors);
        setCalendars({
            Meeting: { color: colors.Meeting },
            Design: { color: colors.Design },
            Workshop: { color: colors.Workshop },
            Deadline: { color: colors.Deadline },
        });
    }, []);

    // Fetch events from Firestore
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const snapshot = await getDocs(
                    collection(db, "circles", "Rf0sddyclf1sONwBYPDs", "events")
                );

                const fetched = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    const day = (data.day || "").slice(0, 10);

                    return {
                        id: doc.id,
                        title: `${data.activity} @ ${data.place}`,
                        start: `${day}T18:00:00`,
                        end: `${day}T20:00:00`,
                        calendarId: data.status === "confirmed" ? "Meeting" : "Deadline",
                        location: data.Location,
                        raw: data,
                    };
                });

                setEvents(fetched);
            } catch (err) {
                console.error("Error fetching events", err);
            }
        };

        fetchEvents();
    }, []);

    if (Object.keys(categoryColors).length === 0 || events.length === 0) {
        return (
            <div
                style={{
                    color: "#c5c6c7",
                    background: "#0b0c10",
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                Loading...
            </div>
        );
    }

    return <EventsPresentional calendarApp={calendarApp} categoryColors={categoryColors} />;
}