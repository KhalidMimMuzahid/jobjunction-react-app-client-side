import React from "react";
import { SearchContext } from "../../context/SearchPovider/SearchPovider";

const ControlSearchInNav = ({ children }) => {
  const {
    setSearchBarIsOpen,
    setSearchKey,
    setSearchType,
    setRefreshSearchKey,
  } = React.useContext(SearchContext);
  setSearchKey("");

  return children;
};
export default ControlSearchInNav;
