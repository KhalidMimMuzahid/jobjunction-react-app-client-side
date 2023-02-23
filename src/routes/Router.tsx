import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Main from "../layouts/Main/Main";
import Feed from "../Pages/Feed/Feed";
import Jobs from "../Pages/Jobs/Jobs";
import Messaging from "../Pages/Messaging/Messaging";
import MyNetwork from "../Pages/MyNetwork/MyNetwork";
import MyProfile from "../Pages/MyProfile/MyProfile";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";

//  don't touch this file anymore
//  don't touch this file anymore
//  don't touch this file anymore
//  don't touch this file anymore
//  don't touch this file anymore
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/feed",
        element: <Feed />,
      },
      {
        path: "/my-network",
        element: <MyNetwork />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/my-profile",
        element: <MyProfile />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/messaging",
        element: <Messaging />,
      },
    ],
  },
]);

// <Route path="/" element={<Main />}>
// <Route path="/" element={<Home />}></Route>
// <Route path="/my-network" element={<MyNetwork />}></Route>
// <Route path="/jobs" element={<Jobs />}></Route>
// <Route path="/my-profile" element={<MyProfile />}></Route>
// <Route path="/signin" element={<SignIn />}></Route>
// <Route path="/signup" element={<SignUp />}></Route>
// <Route path="/messaging" element={<Messaging />}></Route>
// </Route>
