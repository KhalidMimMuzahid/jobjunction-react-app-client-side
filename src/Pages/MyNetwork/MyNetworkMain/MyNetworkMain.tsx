import React, { useContext } from "react";
import { Box, Stack, Avatar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import {
  ACCEPTIGNORE,
  INVITATION,
  PROFILEINFOACCEPT,
  SHOWMOREBTN,
} from "./MyNetwork.styled";
import { MyContext } from "../../../context/MyProvider/MyProvider";
import { useMyProfile } from "../../../useHooks/useMyProfile/useMyProfile";
import Loader from "../../../Components/Loader/Loader";
import EachMyReq from "./EachMyReq/EachMyReq";

const MyNetworkMain = () => {
  const { data: myProfile, isLoading, refetch } = useMyProfile();
  if (isLoading) {
    return <Loader type="" />;
  }
  const { pendingReq } = myProfile;
  console.log("pendin req", pendingReq);

  return (
    <div>
      <Stack>
        <INVITATION paddingX={2}>
          <h5>Invitations</h5>
          <h5>See all</h5>
        </INVITATION>

        <>
          {pendingReq?.length !== 0 &&
            pendingReq?.map((eachhReq: any) => (
              <EachMyReq
                key={eachhReq?.senderEmail}
                eachhReq={eachhReq}
                refetch={refetch}
              />
            ))}
        </>

        <SHOWMOREBTN sx={{ display: "grid", placeItems: "center" }}>
          <button>
            <a href="/">Show more..</a>
          </button>
        </SHOWMOREBTN>
      </Stack>
    </div>
  );
};

export default MyNetworkMain;
