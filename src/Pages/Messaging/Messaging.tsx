import { Box } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import { MyContext } from "../../context/MyProvider/MyProvider";
import MessagingDetails from "./MessagingDetails/MessagingDetails";
import MessagingList from "./MessagingList/MessagingList";

const Messaging = () => {
  const { setIsChatSelected, isChatSelected } = React.useContext(MyContext);
  // setIsChatSelected(false);
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "4fr 7fr",
        },
      }}
    >
      <Box
        sx={{
          display: {
            xs: isChatSelected ? "none" : "block",
            md: "block",
          },
        }}
      >
        {/* <h1>{isChatSelected ? "isSelected" : "is not selected"}</h1> */}
        <MessagingList />
      </Box>
      {/* sx={{ display: isChatSelected ? "block" : "none" }} */}
      <Box
        sx={{
          display: {
            xs: isChatSelected ? "block" : "none",
            md: "block",
          },
        }}
      >
        {/* <MessagingDetails /> */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Messaging;
