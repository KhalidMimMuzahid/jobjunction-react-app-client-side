import React from "react";
import { Box } from "@mui/system";
import SearchResultLists from "./SearchResultLists/SearchResultLists";
import { Outlet } from "react-router-dom";
const Search = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "4fr 7fr",
        },
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          backgroundColor: "#fff",
        }}
      >
        <SearchResultLists />
      </Box>

      <Box sx={{ background: "#fff" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Search;
