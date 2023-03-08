import React, { useContext, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import {
  MESSAGINGCHATINGCONTAINER,
  CALLVIDEOSECTION,
  USERMESSAGEINFO,
} from "./MessagingDetails.styled";
import Typography from "@mui/material/Typography";
import CallIcon from "@mui/icons-material/Call";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import AttachmentIcon from "@mui/icons-material/Attachment";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TextsmsIcon from "@mui/icons-material/Textsms";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import MoodIcon from "@mui/icons-material/Mood";
import { CHATINGINPUT } from "../MessagingList/MessagingList.styled";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MyContext } from "../../../context/MyProvider/MyProvider";
import EachMessage from "./EachMessage/EachMessage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "react-toastify";
// import { io } from "socket.io-client";
import { SearchContext } from "../../../context/SearchPovider/SearchPovider";
// const ENDPOINT: any = process.env.REACT_APP_server_link;
// let socket: any, selectedChatCompare: any;
const MessagingDetails = () => {
  const { setRefreshMessageListToggle } = useContext(SearchContext);
  const { currentUser, setIsChatSelected } = useContext(MyContext);
  const [chatProfilePhoto, setChatProfilePhoto] = React.useState("");
  const [chatName, setChatName] = React.useState("");
  const [chatInfo, setChatInfo] = React.useState({});
  const chatId = useLoaderData();
  console.log("chatId: ", chatId);

  const [socketConnected, setSocketConnected] = React.useState(false);
  const [isConnectionSent, setIsConnectionSent] = React.useState(false);
  // socket?.emit("join chat", currentUser);
  // useEffect(() => {
  //   if (currentUser?.email) {
  //     socket = io(ENDPOINT);
  //     socket?.emit("join chat", currentUser?.email);
  //     // socket.emit("setup", currentUser);
  //     // socket.on("connected", () => setSocketConnected(true));
  //   }
  //   // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_server_link}/chatInfo?chatId=${chatId}`)
      .then((res) => res.json())
      .then((data) => {
        setChatInfo(data);
        // socket?.emit("join chat", chatId);
        // socket?.emit("join chat", currentUser);
        if (data?.isGroupChat) {
          setChatProfilePhoto(data?.chatProfilePhoto);
          setChatName(data?.chatName);
        } else {
          let users: [];
          users = data?.users;
          const userObject: any = users?.find(
            (each: any) => each?.email !== currentUser?.email
          );
          const userEmail = userObject?.email;
          console.log("userEmail: ", userEmail);
          fetch(
            `${process.env.REACT_APP_server_link}/userProfile?email=${userEmail}`
          )
            .then((res) => res.json())
            .then((data) => {
              // console.log("this is another user: ", data);
              setChatProfilePhoto(data?.profilePhoto);
              setChatName(data?.name);
            });
        }
      });
  }, [chatId]);

  const {
    data: messages,
    error,
    isError,
    isFetched,
    isFetching,
    isLoading,
    isRefetchError,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: [chatId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_server_link}/search-messages?chatId=${chatId}`
      );
      const data = await res.json();
      // console.log(
      //   "resultxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx: ",
      //   data
      // );
      return data;
    },
  });

  interface MessageList {
    userName: string;
    logo: string;
    message: string;
    time: string;
    day: string;
  }
  const handleMeassageSubmit = (e: any) => {
    e.preventDefault();
    const message = e.target.message.value;
    if (!message) {
      return;
    }
    const messageInfo = {
      chatId,
      message,
      senderEmail: currentUser.email,
    };
    fetch(`${process.env.REACT_APP_server_link}/sendMessage`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(messageInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(
          "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx:",
          data
        );
        if (data?.acknowledged) {
          e.target.reset();
          refetch();
          setRefreshMessageListToggle((prev: any) => !prev);
          // const messageDetailsInfo = { messageInfo, chatInfo };
          // socket.emit("new message", messageDetailsInfo);
        }
      });
  };
  // useEffect(() => {
  //   socket.on("message recieved", (messageInfo: any) => {
  //     console.log("you received message", messageInfo);
  //     refetch();
  //     setRefreshMessageListToggle((prev: any) => !prev);
  //   });
  // });

  return (
    <MESSAGINGCHATINGCONTAINER
      sx={{ position: "relative", paddingY: ".75rem" }}
    >
      {/* top side. its name and logo. call, video, information button initial */}
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CALLVIDEOSECTION direction="row" spacing={2}>
          {/* client images */}
          <IconButton
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={() => setIsChatSelected(false)}
          >
            <ArrowBackIcon fontSize="medium" />
          </IconButton>

          <Box>
            <img
              style={{ width: "50px", height: "50px", borderRadius: "100%" }}
              src={chatProfilePhoto}
              alt={chatName}
            />
          </Box>
          {/* client name  */}
          <Box>
            <Typography component="h4">{chatName}</Typography>
          </Box>
        </CALLVIDEOSECTION>
        {/* call video convention information section */}
        <Box>
          <IconButton>
            <CallIcon fontSize="medium" />
          </IconButton>
          <IconButton>
            <VideocamOutlinedIcon fontSize="medium" />
          </IconButton>
          <IconButton>
            <InfoIcon fontSize="medium" />
          </IconButton>
        </Box>
      </Paper>

      {/* client or your messaging list section */}
      {/* sx={{ overflowY: 'scroll', height: '100vh' }} */}
      {/* chating section start */}
      <Box sx={{ overflowY: "scroll", height: "700px", margin: "1rem" }}>
        {messages?.map((eachMessage: any) => (
          <EachMessage
            key={eachMessage?._id}
            eachMessage={eachMessage}
            refetch={refetch}
          />
        ))}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            "& button": {
              color: "#FF1744",
            },
            position: "absolute",
            bottom: "10px",
            width: "100%",
            left: "0",
            zIndex: "999",
          }}
        >
          {/* Plus icons */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton>
              <AddCircleIcon />
            </IconButton>
            {/* attacth icons */}
            <IconButton>
              <AttachmentIcon />
            </IconButton>
            <IconButton>
              <TextsmsIcon />
            </IconButton>
            {/* voice icons */}
            <IconButton>
              <KeyboardVoiceIcon />
            </IconButton>
            {/* smile icons */}
            <IconButton>
              <MoodIcon />
            </IconButton>
          </Box>
          {/* middle section chat input filed start */}
          <form onSubmit={handleMeassageSubmit}>
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
              <Box sx={{ flexGrow: 1 }}>
                <CHATINGINPUT
                  name="message"
                  type="text"
                  placeholder="type your message..."
                />
              </Box>
              <Typography
                sx={{ marginLeft: "5px", ":hover": { cursor: "pointer" } }}
              >
                <button type="submit">send</button>
              </Typography>
            </Box>
          </form>
          {/* chat input filed end */}

          {/* voice icons this right section  */}
          <Box>
            {/* voice icons */}
            <IconButton>
              <KeyboardVoiceIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      {/* chating section end */}
    </MESSAGINGCHATINGCONTAINER>
  );
};

export default MessagingDetails;
