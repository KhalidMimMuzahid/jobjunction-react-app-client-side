import React, { useContext } from "react";

const checkAlreadyUser = (uid) => {
  console.log("Checking,;;;;;;;;", uid);
  return fetch(
    `${process.env.REACT_APP_server_link}/checkuseralreadyindatabase?uid=${uid}`
  );
};

export default checkAlreadyUser;
