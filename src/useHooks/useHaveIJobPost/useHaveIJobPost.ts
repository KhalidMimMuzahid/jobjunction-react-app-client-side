import React, { useContext, useEffect } from "react";
import { MyContext } from "../../context/MyProvider/MyProvider";
import { useQuery } from "@tanstack/react-query";

export const useHaveIJobPost = () => {
  const { currentUser } = useContext(MyContext);
  //   const [haveIJobPost, setHaveIJobPost] = React.useState(false);

  //   console.log("hitting", currentUser);

  //   useEffect(()=>{
  // if(currentUser && currentUser?.uid){
  //     fetch(`${process.env.REACT_APP_server_link}/myprofile?uid=${currentUser?.uid}`)
  // }

  //   }, [currentUser])

  const {
    data: haveIJobPost = false,
    error,
    isError,
    isFetched,
    isFetching,
    isLoading,
    isRefetchError,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: [currentUser],
    queryFn: async () => {
      if (currentUser?.uid) {
        const res = await fetch(
          `${process.env.REACT_APP_server_link}/haveIJobPost?userEmail=${currentUser?.email}`
        );
        const data = await res.json();
        // console.log("usehoook:", data);
        if (data?.length >= 1) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
  });

  return { haveIJobPost, isLoading };
};
