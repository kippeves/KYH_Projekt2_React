import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import svLocale from '@fullcalendar/core/locales/sv';
import * as React from "react";


export default function CalendarView(){
    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            locale={svLocale}
        />
    );
}
