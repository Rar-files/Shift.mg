import React, { FC } from "react";
import { ICalendarEvent } from ".";

type Props = {
    calendarEvent: ICalendarEvent;
    children?: React.ReactNode;
};

const EventWrapper: FC<Props> = (props) => {

  return (
    <div style={{background: `${props.calendarEvent.color}`}}>
      {props.children}
    </div>
  );
};

export default EventWrapper;
