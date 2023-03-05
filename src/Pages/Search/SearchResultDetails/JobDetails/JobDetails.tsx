import React from "react";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import { MyContext } from "../../../../context/MyProvider/MyProvider";
import Loader from "../../../../Components/Loader/Loader";
const JobDetails = () => {
  const { currentUser } = React.useContext(MyContext);
  const [isApplyed, setIsApplyed] = React.useState(false);
  const job_id = useLoaderData();
  console.log("_id: ", job_id);
  const {
    data: job,
    error,
    isError,
    isFetched,
    isFetching,
    isLoading,
    isRefetchError,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: [job_id],
    queryFn: async () => {
      if (job_id) {
        const res = await fetch(
          `${process.env.REACT_APP_server_link}/jobs/${job_id}`
        );

        const data = await res.json();
        console.log("job data: ", data);
        const allApplicants = data?.data?.totalApplyed;
        const isApplyed2 = allApplicants.findIndex(
          (email: any) => email === currentUser?.email
        );
        // console.log("isapplyed", isApplyed2);
        if (isApplyed2 !== -1) {
          setIsApplyed(true);
        }
        return data?.data;
      }

      return [];
    },
  });
  console.log("job: ", job);

  if (isLoading) {
    return <Loader type="" />;
  }
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
  } = job;
  const splitedTime = postDate?.split("T");
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {job?.jobTitle && (
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
              // onClick={() => handelApply()}
            >
              {isApplyed ? "Applyed" : "Apply"}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default JobDetails;
