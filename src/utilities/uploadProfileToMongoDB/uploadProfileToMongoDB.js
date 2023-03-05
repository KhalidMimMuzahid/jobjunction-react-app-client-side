import React, { useContext } from "react";

const uploadProfileToMongoDB = (userInfoForDB) => {
  return fetch(`${process.env.REACT_APP_server_link}/insertusertodb`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(userInfoForDB),
  });
};

export default uploadProfileToMongoDB;
