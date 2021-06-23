import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setChat } from "./features/chatSlice";
import db from "./firebase";
import "./SidebarChat.css";
import * as timeago from "timeago.js";
import axios from "./axios"
import Pusher from "pusher-js"


const pusher = new Pusher('0aa162db0767aeb99aae', {
      cluster: 'eu'
    });

function SidebarChat({ id, chatName }) {
  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState([]);
  const [lastMsg, setLastMsg] = useState("")
  const [lastPhoto, setLastPhoto] = useState("")
  const [lastTimestamp, setLastTimestamp] =useState("")

  const getSidebarElement = () => {
    axios.get(`/get/lastMessage?id=${id}`).then((res) => {
      setLastMsg(res.data.message)
      setLastPhoto(res.data.user.photo)
      setLastTimestamp(res.data.timestamp)
    })
  }

  useEffect(() => {
    getSidebarElement()

    const channel = pusher.subscribe("messages");
    channel.bind("newMessage", function (data) {
      getSidebarElement()
    })
  })

  // useEffect(() => {
  //   db.collection("chats")
  //     .doc(id)
  //     .collection("messages")
  //     .orderBy("timestamp", "desc")
  //     .onSnapshot((snapshot) =>
  //       setChatInfo(snapshot.docs.map((doc) => doc.data()))
  //     );
  // }, [id]);

  return (
    <div
      onClick={() =>
        dispatch(
          setChat({
            chatId: id,
            chatName: chatName,
          })
        )
      }
      className="sidebarChat"
    >
    <Avatar src={lastPhoto} />
      {/* <Avatar src={chatInfo[0]?.photo} /> */}
      <div className="sidebarChat__info">
        <h3>{chatName}</h3>
        <p>{lastMsg}</p>
        {/* <p>{chatInfo[0]?.message}</p> */}
        <small>
              {new Date(parseInt(lastTimestamp)).toUTCString()}
          {/* {timeago.format(new Date(chatInfo[0]?.timestamp?.toDate()))} */}
        </small>
      </div>
    </div>
  );
}

export default SidebarChat;
