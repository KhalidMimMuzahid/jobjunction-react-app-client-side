import React from "react";
import { Box, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
  MESSAGINGCHATINGCONTAINER,
  CALLVIDEOSECTION,
  USERMESSAGEINFO,
} from "../MessagingDetails.styled";
import { MyContext } from "../../../../context/MyProvider/MyProvider";
const EachMessage = (props: any) => {
  const { currentUser } = React.useContext(MyContext);
  const [senderPhoto, setSenderPhoto] = React.useState(currentUser?.photoURL);
  const [senderName, setSenderName] = React.useState(currentUser?.displayName);
  const { eachMessage, refetch } = props;
  if (eachMessage?.sender?.email !== currentUser?.email) {
    // this is not my message
    fetch(
      `http://localhost:5000/userProfile?email=${eachMessage?.sender?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("this is another user: ", data);
        setSenderPhoto(data?.profilePhoto);
        setSenderName(currentUser?.name);
      });
  }
  return (
    <Box>
      {
        eachMessage?.sender?.email !== currentUser?.email ? (
          // <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginY: "0.75rem",
              mr: { lg: "150px", md: "100px", sm: "50px", xs: "30px" },
            }}
          >
            <Box>
              <img
                style={{
                  width: "25px",
                  height: "25px",
                  borderRadius: "100%",
                  marginRight: "0.75rem",
                }}
                src={`${
                  senderPhoto
                    ? senderPhoto
                    : "https://i.ibb.co/qyv53dQ/150-1503945-transparent-user-png-default-user-image-png-png.png"
                }`}
                alt={senderName}
              />
            </Box>
            <USERMESSAGEINFO>
              <Typography component="p">{eachMessage?.message}</Typography>
            </USERMESSAGEINFO>
          </Box>
        ) : (
          // </Box>

          // <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginY: "0.75rem",
              ml: { lg: "150px", md: "100px", sm: "50px", xs: "30px" },
            }}
          >
            <USERMESSAGEINFO sx={{ marginRight: "0.75rem" }}>
              <Typography component="p">{eachMessage?.message}</Typography>
            </USERMESSAGEINFO>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                style={{
                  width: "25px",
                  height: "25px",
                  borderRadius: "100%",
                  marginRight: "0.75rem",
                }}
                src={`${
                  senderPhoto
                    ? senderPhoto
                    : "https://i.ibb.co/qyv53dQ/150-1503945-transparent-user-png-default-user-image-png-png.png"
                }`}
                alt={senderName}
              />
            </Box>
          </Box>
        )

        //</Box>
      }
    </Box>
  );
};

export default EachMessage;
