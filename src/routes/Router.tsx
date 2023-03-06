import { createBrowserRouter, useNavigate } from "react-router-dom";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Main from "../layouts/Main/Main";
import Feed from "../Pages/Feed/Feed";
import Home from "../Pages/Home/Home";
import Jobs from "../Pages/Jobs/Jobs";
import SingleJob from "../Pages/Jobs/SingleJob/SingleJob";
import Messaging from "../Pages/Messaging/Messaging";
import MessagingDetails from "../Pages/Messaging/MessagingDetails/MessagingDetails";
import MyJobDetails from "../Pages/MyJobPosts/MyJobDetails/MyJobDetails";
import MyJobLists from "../Pages/MyJobPosts/MyJobLists/MyJobLists";
import MyJobPosts from "../Pages/MyJobPosts/MyJobPosts";
import MyNetwork from "../Pages/MyNetwork/MyNetwork";
import MyProfile from "../Pages/MyProfile/MyProfile";
import MyProfileMain from "../Pages/MyProfile/MyProfileMain/MyProfileMain";
import MyResume from "../Pages/MyProfile/MyResume/MyResume";
import PostAJob from "../Pages/PostAJob/PostAJob";
import Search from "../Pages/Search/Search";
import SearchResultDetails from "../Pages/Search/SearchResultDetails/SearchResultDetails";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import ControlMessageRoute from "./ControlMessageRoute/ControlMessageRoute";
import ControlSearchInNav from "./ControlSearchInNav/ControlSearchInNav";
import PrivetRoute from "./PrivetRoute/PrivetRoute";

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
        path: "/",
        element: <Home />,
      },
      {
        path: "/feed",
        element: (
          // <ControlSearchInNav>
          <PrivetRoute>
            <Feed />
          </PrivetRoute>
          // </ControlSearchInNav>
        ),
      },
      {
        path: "/my-network",
        element: (
          // <ControlSearchInNav>
          <MyNetwork />
          // </ControlSearchInNav>
        ),
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/jobs/:id",
        element: <SingleJob />,
        loader: ({ params }) =>
          fetch(`${process.env.REACT_APP_server_link}/jobs/${params.id}`),
      },
      {
        path: "/my-profile",
        element: <MyProfile />,
        children: [
          {
            path: "/my-profile",
            element: <MyProfileMain />,
          },
          {
            path: "/my-profile/my-resume",
            element: <MyResume />,
          },
        ],
      },
      {
        path: "/my-job-post",
        element: <MyJobPosts />,
        children: [
          {
            path: "/my-job-post",
            element: <MyJobDetails />,
          },
          {
            path: "/my-job-post/:id",
            loader: ({ params }) =>
              fetch(`${process.env.REACT_APP_server_link}/jobs/${params.id}`),
            element: <MyJobDetails />,
          },
        ],
      },
      {
        path: "/search",
        element: <Search />,
        children: [
          {
            path: "/search",
            element: <SearchResultDetails />,
          },
          {
            path: "/search/:id",
            loader: async ({ params }) => params?.id,
            element: <SearchResultDetails />,
          },
        ],
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
        element: (
          // <ControlMessageRoute>
          <Messaging />
          // </ControlMessageRoute>
        ),
        children: [
          {
            path: "/messaging/message-details/:chat_id",
            loader: ({ params }) => params?.chat_id,
            element: <MessagingDetails />,
          },
        ],
      },
      {
        path: "/jobs/post-a-job",
        element: <PostAJob />,
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
