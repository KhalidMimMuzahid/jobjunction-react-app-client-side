import { Box, Button, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import React from "react";
import IconButton from "@mui/material/IconButton";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import MapsHomeWorkOutlinedIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import {
  PostField,
  PostTop,
  PostContainer,
  PostBottom,
  PostBtnGruop,
} from "./UserPost.styled";
import ModalUserTimePosted from "./ModalUserTimePosted/ModalUserTimePosted";
import { MyContext } from "../../../../../context/MyProvider/MyProvider";

const UserPost = (props: any) => {
  const { setRefreshAllPost } = props;
  const { currentUser } = React.useContext(MyContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <PostContainer>
      {/* PostTOp start */}
      <PostTop>
        <img
          src={currentUser?.photoURL}
          alt={currentUser?.displayName}
          style={{ height: "40px", width: "40px", borderRadius: "100%" }}
        />
        <PostField className="postField" onClick={handleOpen}>
          <Button>Create a post</Button>
        </PostField>
      </PostTop>
      {/* PostTop End */}
      {/* postBottom start */}.
      <PostBottom
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // borderTop: '1.5px solid #eee'
          flexWrap: "wrap"
        }}
      >
        {/* Photo btn */}
        <PostBtnGruop>
          <IconButton>
            <PhotoOutlinedIcon />
          </IconButton>
          <span>Photo</span>
        </PostBtnGruop>
        <PostBtnGruop>
          {/* Video btn */}
          <IconButton>
            <OndemandVideoOutlinedIcon />
          </IconButton>
          <span>Video</span>
        </PostBtnGruop>

        {/* Job btn */}
        <PostBtnGruop>
          <IconButton>
            <WorkOutlineOutlinedIcon />
          </IconButton>
          <span>Job</span>
        </PostBtnGruop>

        {/* WriteArticle btn */}
        <PostBtnGruop>
          <IconButton>
            <MapsHomeWorkOutlinedIcon />
          </IconButton>
          <span>Write article</span>
        </PostBtnGruop>
      </PostBottom>
      {/* nested modal ===userTimeline posted==== */}
      <ModalUserTimePosted
        setRefreshAllPost={setRefreshAllPost}
        open={open}
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </PostContainer>
  );
};

export default UserPost;
