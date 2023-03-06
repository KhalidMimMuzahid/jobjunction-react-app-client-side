import React from "react";
import { useLoaderData } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";

const MyJobDetails = () => {
  const myJob = useLoaderData();
  console.log(myJob);
  if (!myJob) {
    return (
      <div>
        <h1>to view details, please select any job</h1>
      </div>
    );
  }
  return <div>job details is here</div>;
};

export default MyJobDetails;
