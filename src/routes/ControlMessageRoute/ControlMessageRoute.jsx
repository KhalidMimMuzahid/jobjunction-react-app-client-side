import React from "react";
import { MyContext } from "../../context/MyProvider/MyProvider";
import { SearchContext } from "../../context/SearchPovider/SearchPovider";

const ControlMessageRoute = ({ children }) => {
  const { setIsChatSelected } = React.useContext(MyContext);
  setIsChatSelected(false);
  return children;
};
export default ControlMessageRoute;
