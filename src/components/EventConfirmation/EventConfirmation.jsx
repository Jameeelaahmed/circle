import React, { useContext, useEffect } from "react";
import { EventContext } from "../../contexts/EventContext";

export default function EventConfirmation() {
  let { pollID, setpollID } = useContext(EventContext);



  return <div>EventConfirmation</div>;
}
