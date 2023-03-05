import React from "react";
import { Container } from "@mui/material";
import { NewsFeedContainer } from "./NewsFeeds.styled";
import UserPost from "./UserPost/UserPost";
import NewsFeedCard from "./NewsFeedCard/NewsFeedCard";
import Loader from "../../../../Components/Loader/Loader";

const NewsFeeds = () => {
  // json data in news feed web page

  const [datas, setData] = React.useState(null);
  const [refreshAllPost, setRefreshAllPost] = React.useState(false);
  const [isNewsFeedLoading, setIsNewsFeedLoading] = React.useState(true);

  React.useEffect(() => {
    setIsNewsFeedLoading(true);
    fetch(`${process.env.REACT_APP_server_link}/allposts`)
      .then((res) => res.json())
      .then((value) => {
        setData(value?.data?.reverse());
        setIsNewsFeedLoading(false);
        // console.log(data)
      });
  }, [refreshAllPost]);

  if (isNewsFeedLoading) {
    return <Loader />;
  }
  // const NewsFeedCards = [
  //   {
  //     userLogo: "https://i.ibb.co/4MnMYkJ/Joseph-Gray.png",
  //     userName: "Joseph-Gray",
  //     occupation: "software developer",
  //     times: "50 mins ago",
  //     description:
  //       "this is paragraph.this is paragraph.this is paragraph.this is paragraph.this is paragraph.this is paragraph.",
  //     images: "https://i.ibb.co/zNjDjvy/redux-png.png",
  //     liked: "300",
  //     allComments: "150",
  //   },
  //   {
  //     userLogo: "https://i.ibb.co/4Wk94qt/sumit-shah-logo.png",
  //     userName: "Sumit Saha",
  //     occupation: "Entrepreneur | Educator | Programming Enthusiast",
  //     times: "30 mins ago",
  //     description: `The "Think in a Redux way" course mainly emphasizes project-based teaching methods. Throughout the course many projects are presented and given as assignments. Since this is a front-end course and focused on state management and redux, we will provide the back-end and APIs for each project. The student just needs to use them in the front end and manage the state properly. Some such projects are shown in the video.
  //     If you want to take full advantage of this course's project-based teaching method and take your skills to the next level, enroll in our Redux course now instead of waiting until the last day for a discount.`,
  //     images: "https://i.ibb.co/zNjDjvy/redux-png.png",
  //     liked: "100k",
  //     allComments: "200",
  //   },
  //   {
  //     userLogo: "https://i.ibb.co/jvj33G3/jhankar-mahbub.png",
  //     userName: "Jhankar Mahbub",
  //     occupation: "Senior Web developer",
  //     times: "31 mins ago",
  //     description: `If you sell something, you make a customer today; if you help someone, you make a customer for life.`,
  //     images: "https://i.ibb.co/dD39NC4/jhankar-mahbub-sir-img1.png",
  //     liked: "100k",
  //     allComments: "200",
  //   },
  // ];
  return (
    <Container maxWidth="lg">
      <UserPost setRefreshAllPost={setRefreshAllPost} />
      <NewsFeedContainer>
        {datas &&
          datas?.map((data, i) => (
            <NewsFeedCard
              key={i}
              data={data}
              setRefreshAllPost={setRefreshAllPost}
            ></NewsFeedCard>
          ))}
      </NewsFeedContainer>
    </Container>
  );
};

export default NewsFeeds;
