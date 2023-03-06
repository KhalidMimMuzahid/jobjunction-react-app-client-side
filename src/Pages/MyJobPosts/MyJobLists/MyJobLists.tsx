import React, { useContext, useEffect, useState } from "react";
import { Avatar, Box, Divider, Stack, styled, Typography } from "@mui/material";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import { MyContext } from "../../../context/MyProvider/MyProvider";
import { NavLink } from "react-router-dom";
export const JobListsContailer = styled(Stack)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: "1rem",
  overflowY: "scroll",
  height: "100%",

  "& .activeColor": {
    color: "#ff1714",
    border: "1px solid #ff1714",
    boxShadow: "1px 1px 7px #ff1714",
    fontSize: "1.25rem",
    // fontWeight: 900,
  },

  "& a": {
    textDecoration: "none",
    color: "#131313",
    display: "block",
    margin: ".25rem .25rem",
    border: "1px solid #ddd",
    padding: "0.75rem 1rem",
    borderRadius: "10px",
    position: "relative",
    transition: "7ms",
  },
  "& a:hover": {
    textDecoration: "none",
    color: "black",
    display: "block",
  },
  "& .userName_container ": {
    // background: '#eee',
  },
  "& a:hover ": {
    // background: '#eee',
    background: "#eee",
    color: "#ff1714",
    fontWeight: "bold",
    // fontSize: "1.25rem",
  },
}));

const MyJobLists = () => {
  const { currentUser } = useContext(MyContext);
  const [myJobs, setMyJobs] = useState([]);
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_server_link}/haveIJobPost?userEmail=${currentUser?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMyJobs(data);
      });
  }, [currentUser]);

  return (
    <JobListsContailer>
      {myJobs &&
        myJobs?.map((job: any) => (
          <NavLink
            className={({ isActive }) => (isActive ? "activeColor" : undefined)}
            style={{}}
            key={job?._id}
            to={`/my-job-post/${job?._id}`}
          >
            <Box
              sx={{
                margin: ".5em 1em",
                display: "flex",
                alignItems: "center",
                gap: "1em",
              }}
            >
              <Avatar
                variant="square"
                alt="image"
                src={job?.companyImg}
                sx={{ width: 56, height: 56 }}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: "1em",
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ color: "red", m: "0", p: "0", cursor: "pointer" }}
                  >
                    {job?.jobTitle}
                  </Typography>

                  <Typography variant="body2">{job?.companyName}</Typography>
                  <Typography variant="subtitle2" sx={{ color: "gray" }}>
                    {job?.jobLocation}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "green" }}>
                    {job?.workplaceType}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    p: "7px",
                    ":hover": {
                      backgroundColor: "lightGray",
                      borderRadius: "100%",
                      cursor: "pointer",
                    },
                    display: "flex",
                    placeItems: "center",
                  }}
                >
                  <TurnedInNotIcon sx={{}} />
                </Box>
              </div>

              {/* divider */}
            </Box>
            <Divider variant="middle" />
          </NavLink>
        ))}
    </JobListsContailer>
  );
};

export default MyJobLists;
