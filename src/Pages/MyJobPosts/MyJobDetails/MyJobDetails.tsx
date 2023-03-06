import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import React from "react";
import { useLoaderData } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import { app } from "../../../firebase/firebase.config";

const MyJobDetails = () => {
  const myJob: any = useLoaderData();

  // console.log(myJob.);
  console.log(myJob?.data);

  const totalApplyedData = myJob?.data?.totalApplyed

  if (!myJob) {
    return (
      <div>
        <h1>to view details, please select any job</h1>
      </div>
    );
  }
  return <div>
    <Box sx={{ border: "4px dashed red", borderRadius: "2em", padding: "1em ", margin: "1em" }}>
      <h2 style={{ textAlign: "center", marginTop: 0 }}>Job Info</h2>
      <h3>Job Title: {myJob?.data?.jobTitle}</h3>
      <h4>Company Name: {myJob?.data?.companyName}</h4>
      <p>Description: {myJob?.data?.jobDescription}</p>
      <p>Location: {myJob?.data?.jobLocation}</p>
      <p>Job Type: {myJob?.data?.jobType}</p>
      <p>Post Date: {myJob?.data?.postDate.split("T")[0]}</p>
    </Box>

    <h2 style={{ textAlign: "center" }}>You have {totalApplyedData
      && totalApplyedData?.length} applicant</h2>
    {
      totalApplyedData &&
      totalApplyedData?.map((apply: any, i: any) => <Box key={i} sx={{ border: "4px dashed red", borderRadius: "2em", padding: "1em ", margin: "1em" }}>
        {/* card design */}
        <Box sx={{ display: "flex" }}>
          <Box>
            <img style={{ height: "6em", borderRadius: "3em" }} src={apply?.img} alt="" />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", marginLeft: '1em' }}>
            <Box>
              <Typography variant="h6">{apply?.name}</Typography>
              <Typography variant="subtitle2">Email: {apply?.email}</Typography>
              <Typography variant="subtitle2">Phone: {apply?.phone}</Typography>
            </Box>

            <Box>
              <a href={apply?.resumeLink} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                <Button variant="contained">
                  Resume
                </Button>
              </a>
            </Box>

          </Box>




        </Box>
        <Box>
          <Typography variant="subtitle2">Experience: {apply?.experience}+ years</Typography>
          <Typography variant="subtitle2">Expected Salary: {apply?.expectedSalary}$</Typography>
          <Typography variant="subtitle2">Notice Period: {apply?.noticePeriod} Days</Typography>
        </Box>



      </Box>)
    }
  </div>;
};

export default MyJobDetails;
