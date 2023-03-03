import React, { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export const useUserProfile = (email: string) => {
  // const [isLoading, setIsLoading] = React.useState(true)
  const [userProfile, setUserProfile] = React.useState({});
  //   useEffect(()=>{
  // if(currentUser && currentUser?.uid){
  //     fetch(`http://localhost:5000/myprofile?uid=${currentUser?.uid}`)
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
    queryKey: [email],
    queryFn: async () => {
      if (email) {
        const res = await fetch(
          `http://localhost:5000/userProfile?email=${email}`
        );
        const data = await res.json();
        console.log("fucking user:", data);
        return data;
      } else {
        return "user not found";
      }
    },
  });

  return { data, isLoading, refetch };
};
