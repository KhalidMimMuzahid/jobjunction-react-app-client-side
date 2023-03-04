import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { io } from "socket.io-client";
import { MyContext } from "../../../context/MyProvider/MyProvider";
import { SearchContext } from "../../../context/SearchPovider/SearchPovider";
import PeopleDetails from "./PeopleDetails/PeopleDetails";
import JobDetails from "./JobDetails/JobDetails";
import DefaultDetails from "./DefaultDetails/DefaultDetails";

// const ENDPOINT = "http://localhost:5000";
// let socket, selectedChatCompare;
const SearchResultDetails = () => {
  const { searchType } = React.useContext(SearchContext);
  // console.log(searchType);
  let searchDetails;
  switch (searchType) {
    case "People":
      searchDetails = <PeopleDetails />;
      // code block
      break;
    case "Jobs":
      searchDetails = <JobDetails />;
      // code block
      break;
    default:
      searchDetails = <DefaultDetails />;
    // code block
  }

  // const { currentUser } = useContext(MyContext);
  // const [socketConnected, setSocketConnected] = useState(false);
  // const [isConnectionSent, setIsConnectionSent] = useState(false);
  // useEffect(() => {
  //   if (currentUser?.uid) {
  //     socket = io(ENDPOINT);
  //     socket.emit("setup", currentUser);
  //     socket.on("connction", () => setSocketConnected(true));
  //   }
  //   // eslint-disable-next-line
  // }, [currentUser]);
  // socket.emit("join chat", )
  // const _id = useLoaderData();
  // console.log("_id: ", _id);
  // if (_id) {
  //   fetch(`http://localhost:5000/searchpeople?_id=${_id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setPeople(data);
  //     });
  // }

  return (
    <div>
      {/* <h1>people details</h1> */}
      {searchDetails}
    </div>
  );
};

export default SearchResultDetails;
