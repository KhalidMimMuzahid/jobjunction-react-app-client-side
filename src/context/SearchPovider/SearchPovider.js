import React, { createContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
export const SearchContext = createContext();

const SearchPovider = ({ children }) => {
  const test = { message: "okk" };

  const [searchBarIsOpen, setSearchBarIsOpen] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [refreshMessageListToggle, setRefreshMessageListToggle] =
    useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [searchType, setSearchType] = useState("People");
  const [filterInfo, setFilterInfo] = useState({});
  const [searchResultList, setSearchResultList] = useState([]);
  // const navigate = useNavigate();
  // const {
  //   data: searchResult,
  //   error,
  //   isError,
  //   isFetched,
  //   isFetching,
  //   isLoading,
  //   isRefetchError,
  //   isRefetching,
  //   refetch,
  // } = useQuery({
  //   queryKey: [searchKey, searchType, filterInfo],
  //   queryFn: async () => {
  //     if (searchKey?.length === 0) {
  //       return;
  //     }
  //     // navigate("/search");
  //     const allFilter = {
  //       searchKey,
  //       searchType,
  //       filterInfo,
  //     };
  //     const res = await fetch(`${process.env.REACT_APP_server_link}/search`, {
  //       headers: {
  //         "content-type": "application/json",
  //         data: JSON.stringify(allFilter),
  //       },
  //     });
  //     const data = await res.json();
  //     console.log("result: ", data);
  //     setSearchResultList(data?.data);
  //     return data;
  //   },
  // });

  const info = {
    searchBarIsOpen,
    setSearchBarIsOpen,
    searchKey,
    setSearchKey,
    searchType,
    setSearchType,
    filterInfo,
    setFilterInfo,
    searchResultList,
    setSearchResultList,
    refreshMessageListToggle,
    setRefreshMessageListToggle,
  };
  return (
    <SearchContext.Provider value={info}> {children} </SearchContext.Provider>
  );
};

export default SearchPovider;
