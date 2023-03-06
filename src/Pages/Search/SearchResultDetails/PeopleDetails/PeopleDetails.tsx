import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MyContext } from "../../../../context/MyProvider/MyProvider";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import IsMyProfile from "./IsMyProfile/IsMyProfile";
import IsMyFriend from "./IsMyFriend/IsMyFriend";
import { useMyProfile } from "../../../../useHooks/useMyProfile/useMyProfile";
import IsSentMeConnection from "./IsSentMeConnection/IsSentMeConnection";
import Default from "./Default/Default";
import Loader from "../../../../Components/Loader/Loader";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { PEOPLE_DETAILS_CONTAINER } from "./PeopleDetails.styled";
const PeopleDetails = () => {
  const _id = useLoaderData();
  console.log("_id: ", _id);
  let displayElement;
  const { currentUser } = useContext(MyContext);
  const { data: myProfiile, isLoading: isLoadingForUseProfile } =
    useMyProfile();
  const [isConnectionSent, setIsConnectionSent] = useState(false);
  const [isMyFriends, setIsMyFriends] = useState(false);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [showDisplayElement, setShowDisplayElement] = useState<any>(null);
  const [peopleConnectionType, setPeopleConnectionType] = useState<any>(null);
  const {
    data: people,
    error,
    isError,
    isFetched,
    isFetching,
    isLoading,
    isRefetchError,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: [_id],
    queryFn: async () => {
      if (_id) {
        console.log("hitted");
        const res = await fetch(
          `${process.env.REACT_APP_server_link}/searchpeople?_id=${_id}`
        );
        setIsMyProfile(false);
        setIsMyFriends(false);
        setIsConnectionSent(false);
        const data = await res.json();
        console.log("display user", data);
        const pendingUSer: [] = data?.pendingReq;
        const allFriends: [] = data?.allFriends;
        const isMyProfile = data?.email === currentUser?.email;
        if (isMyProfile) {
          console.log("this is your profile");
          setIsMyProfile(true);
          displayElement = <IsMyProfile />;
          setPeopleConnectionType("IsMyProfile");
        } else {
          const isFriend = allFriends?.findIndex(
            ({ friendEmail }) => friendEmail === currentUser?.email
          );
          if (isFriend !== -1) {
            setIsMyFriends(true);
            console.log("this is friends profile");
            displayElement = <IsMyFriend />;
            setPeopleConnectionType("IsMyFriend");
          } else {
            console.log("myProfile", myProfiile);
            // const myPendingUser = myProfiile?.pendingReq;
            const isSentMeConnection = myProfiile?.pendingReq?.findIndex(
              (eachPending: any) => eachPending?.senderEmail === data?.email
            );
            // console.log("isSentMeConnection; ", isSentMeConnection);
            if (isSentMeConnection !== -1) {
              // to do
              console.log("this user sent you connection");
              displayElement = <IsSentMeConnection />;
              setPeopleConnectionType("IsSentMeConnection");
            } else {
              console.log(
                "pendingUSer: ",
                pendingUSer,
                "\ncurrentUser?.email= ",
                currentUser?.email
              );
              const isSent = pendingUSer?.findIndex(
                ({ senderEmail }) => senderEmail === currentUser?.email
              );
              console.log(" isesent =", isSent);
              if (isSent === -1) {
                setIsConnectionSent(false);
                console.log(" is not sent ");
              } else {
                setIsConnectionSent(true);
                console.log(" is  sent ");
              }
              console.log("this is defaault users");
              displayElement = (
                <Default
                  isSent={isSent}
                  currentUser={currentUser}
                  people={people}
                  refetch={refetch}
                  handleConnectionAction={handleConnectionAction}
                  isConnectionSent={isConnectionSent}
                />
              );
              setPeopleConnectionType("Default");
            }
          }
        }
        setShowDisplayElement(displayElement);
        return data;
      }
    },
  });

  console.log("Peopleeeeeeeeee", people);
  if (isLoadingForUseProfile || isLoading) {
    return <Loader type="" />;
  }
  const handleConnectionAction = () => {
    switch (isConnectionSent) {
      case true:
        // to for cancel request
        const info = {
          senderEmail: currentUser?.email,
          recieverEmail: people?.email,
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
              toast.error(`${people?.name} request canceled`);
              refetch();
            }
          });
        break;
      case false:
        // to do for add connection

        const connectionInfo = {
          senderaInfo: {
            senderEmail: currentUser?.email,
            senderName: currentUser?.displayName,
            senderPhoto: currentUser?.photoURL,
          },
          receiverEmail: people?.email,
        };
        fetch(`${process.env.REACT_APP_server_link}/addconnecion`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(connectionInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data?.modifiedCount) {
              // to do : set state is connection sen
              toast.success("connection sent successfully");
              refetch();
            }
          });
        break;
    }
  };

  return (
    <div>
      {people?.email ? (
        <Box>
          <PEOPLE_DETAILS_CONTAINER spacing={2} direction="row">
            <Box>
              <Avatar
                className="userPhoto"
                src={people?.profilePhoto}
                alt={people?.name}
              />
            </Box>
            <Box>
              <Typography className="userName" component="h3">
                {people?.name}
              </Typography>
              <Typography className="userTitle" component="h3">
                {people?.title}
              </Typography>
            </Box>
          </PEOPLE_DETAILS_CONTAINER>

          <Box sx={{ padding: "0 2rem" }}>
            <h1>view profile</h1>
            {/* peopleConnectionType */}
            {showDisplayElement}
            {/* <IsMyFriend /> */}
            {/* <IsMyProfile/> */}
            {/* <IsSentMeConnection/> */}
            {/* <Default /> */}
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography
            sx={{ textAlign: "center", my: "50px", fontSize: "1rem" }}
          >
            select a user to view details
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default PeopleDetails;
