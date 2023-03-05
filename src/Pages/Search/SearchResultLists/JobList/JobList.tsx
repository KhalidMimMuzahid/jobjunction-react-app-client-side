import { Avatar, Box, Divider, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../../../context/SearchPovider/SearchPovider";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import { NavLink } from "react-router-dom";
import { JobListsContailer } from "./joblLists.styled";
const JobList = () => {
  const { searchResultList: jobs } = React.useContext(SearchContext);
  const navigate = useNavigate();
  //   {
  //     color: '#ff1714',
  //     border: '1px solid #ff1714',
  //     boxShadow: '1px 1px 7px #ff1714',
  //     fontSize: '1.25rem',
  //     fontWeight: 900
  // }

  return (
    <JobListsContailer>
      {jobs &&
        jobs?.map((job: any) => (
          <NavLink
            className={({ isActive }) => (isActive ? "activeColor" : undefined)}
            style={{}}
            key={job?._id}
            to={`/search/${job?._id}`}
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

export default JobList;
