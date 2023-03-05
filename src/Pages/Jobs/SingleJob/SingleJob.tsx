import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { MyContext } from "../../../context/MyProvider/MyProvider";

const SingleJob = () => {
  const data: any = useLoaderData();
  const [isApplyed, setIsApplyed] = useState(false);

  const { currentUser } = useContext(MyContext);

  const {
    companyImg,
    companyName,
    jobDescription,
    jobLocation,
    jobTitle,
    postDate,
    userEmail,
    requireMents,
    responsibilities,
    skillSets,
    _id,
    totalApplyed,
  } = data?.data;

  const splitedTime = postDate.split("T");

  // console.log(data.data)
  // console.log(currentUser?.email)

  // useEffect(() => {
  setTimeout(() => {
    const isApplyed2 = totalApplyed.findIndex(
      (email: any) => email === currentUser?.email
    );
    console.log("isapplyed", isApplyed2);
    if (isApplyed2 !== -1) {
      setIsApplyed(true);
    }
  }, 500);
  // }, [])

  const handelApply = () => {
    const email = currentUser.email;
    const info = {
      email,
      _id,
    };


        fetch('http://localhost:5000/applyajob', {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                info: JSON.stringify(info)
            }
        }).then(res => res.json())
            .then(data => {
                console.log("data.data.modifiedCount", data.data)
                console.log("data", data)
                if(data?.data?.modifiedCount){
                    setIsApplyed(true)
                    toast.success("Successfully applied")
                }
                else{
                    toast.error("Something error happened")
                }
            })
    }


  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{}}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            style={{ width: "50%", margin: "0 auto" }}
            src={companyImg}
            alt=""
          />
        </div>
        <h1>Vacancy: {jobTitle}</h1>
        <h3>Post Date: {splitedTime[0]}</h3>
        <h3>Company Name: {companyName}</h3>
        <h3>Job Description: {jobDescription}</h3>

        <h3>
          Requirements:{" "}
          {requireMents?.map((req: any) => (
            <li>{req}</li>
          ))}
        </h3>

        <h3>
          Needed Skills:{" "}
          {skillSets?.map((skill: any) => (
            <li>{skill}</li>
          ))}
        </h3>

        <h3>
          Responseibility:{" "}
          {responsibilities?.map((res: any) => (
            <li>{res}</li>
          ))}
        </h3>

        <h3>Job Location: {jobLocation}</h3>
        <h3>Contact Email: {userEmail}</h3>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "4em",
            marginTop: "1em",
          }}
        >
          <Button
            variant="outlined"
            disabled={isApplyed}
            onClick={() => handelApply()}
          >
            {isApplyed ? "Applyed" : "Apply"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SingleJob;
