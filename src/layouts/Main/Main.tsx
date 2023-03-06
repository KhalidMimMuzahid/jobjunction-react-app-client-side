import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box/Box";
import { createMuiTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../../Shared/Footer/Footer";
import Navbar from "../../Shared/Navbar/Navbar";
import darkTheme from "../Theme/DarkTheme";
import lightTheme from "../Theme/LightTheme";
import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import SearchActionType from "./SearchActionType/SearchActionType";
import DrawerForFilterAction from "./SearchActionType/DrawerForFilterAction/DrawerForFilterAction";
import "./main.style.css";
import { MyContext } from "../../context/MyProvider/MyProvider";
import { SearchContext } from "../../context/SearchPovider/SearchPovider";
const Main = () => {
  const [selectTheme, setSelectTheme] = useState(false);
  const {
    searchBarIsOpen,
    setSearchBarIsOpen,
    searchKey,
    setSearchKey,
    searchType,
    setSearchType,
    filterInfo,
    setFilterInfo,
    setSearchResultList,
    shouldNavigate,
  } = React.useContext(SearchContext);

  const [scrollStatus, setScrollStatus] = useState("");
  const [ptForMain, setPtForMain] = useState({ pt: "80px" });
  const navigate = useNavigate();
  const {
    data: searchResult,
    error,
    isError,
    isFetched,
    isFetching,
    isLoading,
    isRefetchError,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: [searchKey, searchType, filterInfo],
    queryFn: async () => {
      console.log("ssearch tyype:", searchType);
      console.log("ssearch key:", searchKey);

      if (searchKey?.length === 0 || !setSearchBarIsOpen) {
        return;
      }
      // console.log("fucking: ", searchKey, searchType, filterInfo);
      navigate("/search");
      const allFilter = {
        searchKey,
        searchType,
        filterInfo,
      };
      const res = await fetch(`${process.env.REACT_APP_server_link}/search`, {
        headers: {
          "content-type": "application/json",
          data: JSON.stringify(allFilter),
        },
      });
      const data = await res.json();
      console.log("result: ", data);
      setSearchResultList(data?.data);
      return data;
    },
  });

  useEffect(() => {
    setPtForMain({
      pt: searchBarIsOpen ? "20px" : "80px",
    });
  }, [searchBarIsOpen]);
  let lastScroll = window.scrollY;
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (lastScroll <= 0) {
        // console.log("y scroll is zero");
        setScrollStatus("");
      }
      let currentScroll = window.scrollY;
      if (currentScroll > lastScroll) {
        // console.log("scroll is down");
        setScrollStatus("scroll-down");
      }
      if (currentScroll < lastScroll) {
        // console.log("scroll is up");
        setScrollStatus("scroll-up");
      }
      lastScroll = window.scrollY;
    });
  }, []);

  return (
    <ThemeProvider theme={selectTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ backgroundColor: "#F3F2EF" }}>
        <div id={scrollStatus} className="header">
          <Navbar />
        </div>

        <Container maxWidth="lg">
          {searchBarIsOpen && (
            <div style={{ paddingTop: "65px" }}>
              <SearchActionType
              // setFilterInfo={setFilterInfo}
              // searchType={searchType}
              // setSearchType={setSearchType}
              />
            </div>
          )}
          <Box sx={{ pt: ptForMain?.pt }}>
            {/* <Typography variant="h1">this is h1</Typography>
        <input type="checkbox" onClick={() => setSelectTheme(!selectTheme)} /> */}
            <Outlet />
          </Box>
          {/* <Footer /> */}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Main;
