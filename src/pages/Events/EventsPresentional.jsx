// libs
import { ScheduleXCalendar } from "@schedule-x/react";
// imgs
import CalendarImg from "../../assets/images/calendar.png";
// components
import PollContainer from '../../components/ui/Modal/Poll/PollContainer';

function EventsPresentional({ categoryColors, calendarApp }) {
    return (
        <>
            <PollContainer />
            <div
                className="flex h-screen w-full flex-col gap-6 overflow-hidden  px-6 pt-paddingTop pb-6"
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
    )
}

export default EventsPresentional
