import * as React from "react";
import { useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
// import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import SentimentVeryDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentVeryDissatisfiedOutlined";
import { Box } from "@mui/material";
import { DisplayFlex, LCRSBTN } from "./DisplayFlex.styled";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import UserComment from "../UserComment/UserComment";

//fvfdvfdvfdvfdfdfdfdcvcvcvcvvccvccccvvccccccccccccccccvvvvvvvv
import { useMyProfile } from "../../../../../useHooks/useMyProfile/useMyProfile";
import { useQuery } from "@tanstack/react-query";
import { async } from "@firebase/util";
import { toast } from "react-toastify";
import Loader from "../../../../../Components/Loader/Loader";
import { MyContext } from "../../../../../context/MyProvider/MyProvider";
//fvfdvfdvfdvfdfdfdfdcccvcvcvcvcccvcvcvccvvvvvvvvvvvccvvcvcvcvcv

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function NewsFeedCard({ data, setRefreshAllPost }) {
  // destructure all newsFeed
  const [isLiked, setIsLiked] = React.useState(false);
  const [likeStatus, setLikeStatus] = React.useState("");
  const { data: data1, isLoading, refetch } = useMyProfile();
  const { currentUser } = useContext(MyContext);
  const {
    postDescription,
    postImage,
    allLikes,
    occupation: title,
    postDate,
    profilePhotoURL: userLogo,
    userName,
    _id,
  } = data;

  const [totalLikes, setTotalLikes] = React.useState(allLikes?.length);
  // if (isLoading) {
  //   return <Loader type="" />
  // }

  const splitedTime = postDate.split("T");

  useEffect(() => {
    const isLiked2 = allLikes.findIndex(
      (email) => email === currentUser?.email
    );
    console.log(isLiked2);

    if (isLiked2 !== -1) {
      setIsLiked(true);
    }
  }, [data]);

  const info = {
    _id,
    email: data1?.email,
  };

  // liking api handel
  const handelLike = () => {
    switch (isLiked) {
      case true:
        setIsLiked(false);
        setTotalLikes((prev) => prev - 1);
        fetch(`${process.env.REACT_APP_server_link}/dislikeapost`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            info: JSON.stringify(info),
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            // setIsLiked(false);
            // setRefreshAllPost((prev) => !prev);
            // refetch()
          });
        break;

      default:
        setIsLiked(true);
        setTotalLikes((prev) => prev + 1);
        fetch(`${process.env.REACT_APP_server_link}/likeapost`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            info: JSON.stringify(info),
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            // setIsLiked(true);
            // setRefreshAllPost((prev) => !prev);
            // refetch()
          });
    }
  };

  //   <span>
  //   {isLiked
  //     ? `you and ${totalLikes - 1} other like this`
  //     : `${totalLikes} poeple likes this`}
  // </span>
  useEffect(() => {
    switch (isLiked) {
      case true:
        switch (totalLikes === 1) {
          case true:
            // code block
            setLikeStatus(`you likes this`);
            break;
          default:
            // code block
            setLikeStatus(`you and ${totalLikes - 1} other like this`);
        }
        break;
      default:
        // code block
        setLikeStatus(`${totalLikes} poeple likes this`);
    }
  }, [isLiked]);

  return (
    // single NewsFeed Cards
    <Card sx={{ width: "100%" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <img
              style={{ height: "50px", width: "50px" }}
              src={userLogo}
              alt={userName}
            />
          </Avatar>
        }
        action={
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton aria-label="settings">
              <AddIcon />
            </IconButton>
            <a href="/#">Follow</a>
          </Box>
        }
        title={userName}
        subheader={splitedTime[0]}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {postDescription.length > 150
            ? `${postDescription.slice(0, 150)}....`
            : postDescription}
        </Typography>
      </CardContent>

      <CardMedia
        sx={{
          backgroundSize: "cover",
          maxHeight: { xs: "300px", md: "500px" },
          weight: "100%",
        }}
        image={postImage}
        component="img"
        alt="Paella dish"
      />

      {/*all like comment share container  */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.75rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: "1em",
            fontWeight: 600,
          }}
        >
          <Box
            sx={{
              display: "flex",
              // justifyContent: 'center',
              alignItems: "center",
            }}
          >
            {/* <FavoriteIcon fontSize="small" /> */}
            {/* <ThumbUpOutlinedIcon fontSize="small" /> */}
            {/* <SentimentVeryDissatisfiedOutlinedIcon fontSize="small" /> */}
          </Box>
          <Box>
            {/* <span>{allLikes.length} other likes</span> */}
            <span>{likeStatus}</span>
          </Box>
        </Box>

        {/* comments & shate  */}
        {/* <Box>{allComments}comments</Box> */}
      </Box>

      {/* like, comment, repost, share */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1.5px solid #eee",
        }}
      >
        {/* like btn */}
        <LCRSBTN
          onClick={handelLike}
          style={{
            color: isLiked ? "red" : "black",
            backgroundColor: isLiked ? "#EBEBEB" : "white",
          }}
        >
          <IconButton>
            <ThumbUpOutlinedIcon
              sx={{ color: isLiked ? "red" : "black" }}
              fontSize="small"
            />
          </IconButton>
          <span>{isLiked ? "Liked" : "Like"}</span>
        </LCRSBTN>

        <LCRSBTN>
          {/* comment btn */}
          <IconButton>
            <TextsmsOutlinedIcon fontSize="small" />
          </IconButton>
          <span>comments</span>
        </LCRSBTN>

        {/* repost btn */}
        <LCRSBTN>
          <IconButton>
            <RepeatOutlinedIcon fontSize="small" />
          </IconButton>
          <span>Reposts</span>
        </LCRSBTN>

        {/* send btn */}
        <LCRSBTN>
          <IconButton>
            <SendOutlinedIcon fontSize="small" />
          </IconButton>
          <span>Send</span>
        </LCRSBTN>
      </Box>

      <UserComment id={_id} />
    </Card>
  );
}
