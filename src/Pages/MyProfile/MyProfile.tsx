import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import banner from "../../assests/myprofile/baner.jpg";
import profile from "../../assests/myprofile/profile.jpg";
import Avatar from "@mui/material/Avatar";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Box, Stack } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import { ThemeContext } from "@emotion/react";
import MyProfileRight from "./MyProfileRight/MyProfileRight";

const MyProfile = () => {
  const location = useLocation();
  // console.log(location.pathname);
  let gridTemplateColumnsFormLayout;
  let displayFormLayout;
  if (location?.pathname === "/my-profile") {
    gridTemplateColumnsFormLayout = {
      xs: "1fr",
      md: "7fr 3fr",
    };
    displayFormLayout = {
      xs: "none",
      md: "block",
    };
  } else {
    gridTemplateColumnsFormLayout = {
      xs: "1fr",
      lg: "7fr 3fr",
    };
    displayFormLayout = {
      xs: "none",
      lg: "block",
    };
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { ...gridTemplateColumnsFormLayout },
      }}
    >
      <Box>
        <Outlet />
      </Box>
      <Box
        sx={{
          display: { ...displayFormLayout },
        }}
      >
        <MyProfileRight />
      </Box>
    </Box>
  );
};

export default MyProfile;
