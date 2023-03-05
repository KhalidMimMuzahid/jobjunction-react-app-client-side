import React, { useContext, useEffect } from "react";
import { MyContext } from "../../context/MyProvider/MyProvider";
import { useQuery } from "@tanstack/react-query";

export const useMyProfile = () => {
  const { currentUser } = useContext(MyContext);
  // const [isLoading, setIsLoading] = React.useState(true)
  const [myProfile, setMyProfile] = React.useState({});

  console.log("hitting", currentUser);

  //   useEffect(()=>{
  // if(currentUser && currentUser?.uid){
  //     fetch(`${process.env.REACT_APP_server_link}/myprofile?uid=${currentUser?.uid}`)
  // }

  //   }, [currentUser])

  const {
    data,
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
          `${process.env.REACT_APP_server_link}/myprofile?uid=${currentUser?.uid}`
        );
        const data = await res.json();
        console.log("usehoook:", data);
        return data;
      } else {
        return "user not found";
      }
    },
  });

  return { data, isLoading, refetch };
};
