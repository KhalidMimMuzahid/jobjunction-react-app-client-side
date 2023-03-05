import React from "react";
import { Box, Stack, Avatar } from "@mui/material";
import {
  ACCEPTIGNORE,
  INVITATION,
  PROFILEINFOACCEPT,
  SHOWMOREBTN,
} from "../MyNetwork.styled";
import { useMyProfile } from "../../../../useHooks/useMyProfile/useMyProfile";
import { toast } from "react-toastify";
import Loader from "../../../../Components/Loader/Loader";
const EachMyReq = (props: any) => {
  const { eachhReq, refetch } = props;
  const { data: myProfile, isLoading } = useMyProfile();

  const handleConnectionIgnore = () => {
    const info = {
      senderEmail: eachhReq?.senderEmail,
      recieverEmail: myProfile?.email,
    };
    fetch(`${process.env.REACT_APP_server_link}/caancelconnection`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        info: JSON.stringify(info),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.modifiedCount) {
          toast.error(`${eachhReq?.senderName} request denied`);
          refetch();
        }
      });
  };
  const handleConnectionAccept = () => {
    const recieverInfo = {
      recieverEmail: myProfile?.email,
      recieverName: myProfile?.name,
      recieverPhoto: myProfile?.profilePhoto,
    };
    const info = {
      senderInfo: eachhReq,
      recieverInfo: recieverInfo,
    };
    fetch(`${process.env.REACT_APP_server_link}/acceptconnection`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        info: JSON.stringify(info),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          toast.success(`${eachhReq?.senderName} connected succesfully`);
        }
        refetch();
      });
  };
  if (isLoading) {
    return <Loader type="" />;
  }
  return (
    <PROFILEINFOACCEPT paddingX={2}>
      {/* profile img or degecnation */}
      <Box
        sx={{
          display: "flex",
          padding: "1.50rem 0",
          alignItems: "center",
        }}
      >
        <Avatar alt="Remy Sharp" src={eachhReq?.senderPhoto} />
        <Stack sx={{ marginLeft: "10px" }}>
          <h6>
            <span
              style={{ fontSize: "16px", color: "red", fontWeight: "bold" }}
            >
              {eachhReq?.senderName}{" "}
            </span>
            wants to connect with you
          </h6>
        </Stack>
      </Box>

      {/* accept or ignore btn */}

      <ACCEPTIGNORE direction="row" spacing={3}>
        <button className="accept-btn" onClick={handleConnectionAccept}>
          Accept
        </button>
        <button onClick={handleConnectionIgnore} className="ignore-btn">
          ignore
        </button>
      </ACCEPTIGNORE>
    </PROFILEINFOACCEPT>
  );
};

export default EachMyReq;
