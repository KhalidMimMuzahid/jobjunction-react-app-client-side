import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import InputBase from "@mui/material/InputBase";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MESSAGINGLISTCONTAINER,
  Search,
  SearchIconWrapper,
  SIGNLEMESSAGINGINFO,
  StyledInputBase,
  TOPMESSAGE,
} from "../MessagingList.styled";
import { useUserProfile } from "../../../../useHooks/useUserProfile/useUserProfile";
import { MyContext } from "../../../../context/MyProvider/MyProvider";
import { Link } from "react-router-dom";
const EachList = (props: any) => {
  const [chatProfilePhoto, setChatProfilePhoto] = React.useState("");
  const [chatName, setChatName] = React.useState("");
  const { currentUser, setIsChatSelected } = React.useContext(MyContext);
  const { eachList } = props;
  const navigate = useNavigate();
  //   let users: [];
  //   users = eachList?.users;
  //   const userObject: any = users?.find(
  //     (each: any) => each?.email !== currentUser?.email
  //   );
  //   const userEmail = userObject?.email;
  //   console.log("userEmail: ", userEmail);
  //   const { data: user, isLoading } = useUserProfile(userEmail);
  //   console.log("fucking user:", user);
  if (eachList?.isGroupChat) {
    setChatProfilePhoto(eachList?.chatProfilePhoto);
    setChatName(eachList?.chatName);
  } else {
    let users: [];
    users = eachList?.users;
    const userObject: any = users?.find(
      (each: any) => each?.email !== currentUser?.email
    );
    const userEmail = userObject?.email;
    console.log("userEmail: ", userEmail);
    fetch(`${process.env.REACT_APP_server_link}/userProfile?email=${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("this is another user: ", data);
        setChatProfilePhoto(data?.profilePhoto);
        setChatName(data?.name);
      });
  }
  console.log(eachList);
  return (
    <Link
      onClick={() => setIsChatSelected(true)}
      to={`/messaging/message-details/${eachList?._id}`}
    >
      <SIGNLEMESSAGINGINFO
        sx={{
          minWidth: "100%",
          padding: "0.25rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* image left side */}
        {/* <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        > */}
        <Box>
          <img
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "100%",
              marginRight: "8px",
            }}
            src={
              chatProfilePhoto
                ? chatProfilePhoto
                : "https://i.ibb.co/qyv53dQ/150-1503945-transparent-user-png-default-user-image-png-png.png"
            }
            alt="sumit shah"
          />
        </Box>

        <Box
          sx={{
            flexGrow: "1",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              //   justifyContent: "space-between",
              //   alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: "medium" }} component="p">
              {chatName}
            </Typography>
            <Typography sx={{ color: "#555" }} component="p">
              {eachList?.latestMessage}
            </Typography>
          </Box>
          <Box>
            <Typography component="p">Feb 22</Typography>
          </Box>
        </Box>
        {/* </Box> */}

        {/* userInfo ===right side=== */}
      </SIGNLEMESSAGINGINFO>
    </Link>
  );
};

export default EachList;
