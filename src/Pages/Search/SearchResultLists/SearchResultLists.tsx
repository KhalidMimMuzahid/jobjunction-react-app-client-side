import React from "react";
import { Link } from "react-router-dom";
import { SearchContext } from "../../../context/SearchPovider/SearchPovider";
import DefaultList from "./DefaultList/DefaultList";
import JobList from "./JobList/JobList";
import PeopleList from "./PeopleList/PeopleList";

const SearchResultLists = () => {
  const { searchType } = React.useContext(SearchContext);
  // console.log(searchType);
  let searchResul;
  switch (searchType) {
    case "People":
      searchResul = <PeopleList />;
      // code block
      break;
    case "Jobs":
      searchResul = <JobList />;
      // code block
      break;
    default:
      searchResul = <DefaultList />;
    // code block
  }
  return (
    <div style={{ height: "600px", overflowY: "scroll" }}>
      {/* <h1>length:{searchResultList?.length}</h1> */}

      {searchResul}
    </div>
  );
};
// height: '100vh'
export default SearchResultLists;
