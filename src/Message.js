import { Avatar } from "@material-ui/core";
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import "./Message.css";

const Message = forwardRef(
  (
      { id, sender, message, timestamp},
    // { id, contents: { timestamp, displayName, email, message, photo, uid } },
    ref
  ) => {
    const user = useSelector(selectUser);

    return (
      <div
        ref={ref}
        className={`message ${user.email === sender.email && "message__sender"}`}
        // className={`message ${user.email === email && "message__sender"}`}
      >
        <Avatar className="message__photo" src={sender.photo} />
        <p>{message}</p>
        <small>{new Date(parseInt(timestamp)).toDateString()}</small>
        {/* <small>{new Date(parseInt(timestamp)).toDateString()}</small> */}
      </div>
    );
  }
);

export default Message;
