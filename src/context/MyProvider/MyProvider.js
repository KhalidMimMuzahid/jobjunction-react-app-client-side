import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { app } from "../../firebase/firebase.config";
// import useRole from "../../useHooks/useRole/useRole";

const auth = getAuth(app);
export const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState("");
  const [isRoleLoading, setIsRoleLoading] = useState(true);
  const [isChatSelected, setIsChatSelected] = useState(true);
  // const [searchResultList, setSearchResultList] = useState([]);
  const provider = new GoogleAuthProvider();
  const googleSignIn = () => {
    setIsLoading(true);
    return signInWithPopup(auth, provider);
  };
  const emailPasswordSignIn = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const createUserWithEmail = (email, password) => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const updateUserProfile = (userInfo) => {
    setIsLoading(true);
    return updateProfile(auth.currentUser, userInfo);
  };
  const logOut = () => {
    setIsLoading(true);
    return signOut(auth);
  };
  useEffect(() => {
    const unSUbscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
    return () => unSUbscribe();
  });

  // useEffect(() => {
  //   if (currentUser && currentUser?.email) {
  //     fetch(`https://medi-sell.vercel.app/checkrole?email=${currentUser?.email}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //       });
  //   }
  // }, [currentUser]);
  const test = { message: "okk" };
  const info = {
    googleSignIn,
    emailPasswordSignIn,
    createUserWithEmail,
    updateUserProfile,
    logOut,
    currentUser,
    role,
    setRole,
    isRoleLoading,
    setIsRoleLoading,
    isLoading,
    isChatSelected,
    setIsChatSelected,
  };
  return <MyContext.Provider value={info}>{children}</MyContext.Provider>;
};

export default MyProvider;
