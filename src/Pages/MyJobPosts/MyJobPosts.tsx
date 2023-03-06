import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import MyJobLists from "./MyJobLists/MyJobLists";

const MyJobPosts = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "4fr 7fr",
        },
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          backgroundColor: "#fff",
        }}
      >
        <MyJobLists />
      </Box>

      <Box sx={{ background: "#fff" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MyJobPosts;
