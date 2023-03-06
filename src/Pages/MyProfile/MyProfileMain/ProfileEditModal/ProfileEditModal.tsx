import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  EDIT_CONTAINER,
  ISERT_FIELD,
  MODAL_BODY,
} from "./ProfileEditModal.styled";
import { IconButton, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import GetAppIcon from "@mui/icons-material/GetApp";
import { useForm, SubmitHandler } from "react-hook-form";
import { MyContext } from "../../../../context/MyProvider/MyProvider";
import uploadImageToImageBB from "../../../../utilities/uploadImageToImageBB/uploadImageToImageBB";
import { toast } from "react-toastify";

const ProfileEditModal = (props: any) => {
  const { open, setOpen, handleOpen, handleClose } = props;
  const [allInputDatas, setAllInputData] = React.useState<any>({});
  const { currentUser } = React.useContext(MyContext);

  const [isHereProfileImg, setIsHereProfileImg] = React.useState<any>({});
  const [isHereCoverImg, setIsHereCoverImg] = React.useState<any>({});
  const [photoHandle, setPhotoHandle] = React.useState<any>({});
  // const [profileImg, setProfileImg] = React.useState("")

  // const handlephotoHandle = (e: any) => {

  //     console.log("e.target.files", e.target.value)

  //     const field = e.target.name;
  //     let newPhotoHandle = { ...photoHandle }
  //     if (e.target.value) {
  //         console.log("isaddedd")
  //         newPhotoHandle[field] = e.target.files;
  //         setPhotoHandle(newPhotoHandle)
  //     }
  //     else {
  //         console.log("is removed")
  //         newPhotoHandle[field] = false;
  //         setPhotoHandle(newPhotoHandle)
  //     }
  // }

  type Inputs = {
    profileImg: FileList;
    coverImg: FileList;
    title: string;
    city: string;
    location: string;
    phone: number | string;
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const handleFormSubmit: SubmitHandler<Inputs> = (data) => {
    // console.log("allllll daaaaa", data.profileImg)
    const { title, phone, location, coverImg, profileImg, city } = data;
    const profileImgPicture = profileImg[0];
    const coverImgPicture = coverImg[0];
    uploadImageToImageBB(profileImgPicture)
      .then((res) => res.json())
      .then((profileImgData) => {
        const profileImgLink = profileImgData?.data?.display_url;
        uploadImageToImageBB(coverImgPicture)
          .then((res) => res.json())
          .then((coverImgData) => {
            const coverImgLink = coverImgData?.data?.display_url;

            let userEditInfo = {
              title,
              phone,
              location,
              profilePhoto: profileImgLink,
              coverImgLink,
              name: currentUser?.displayName,
              email: currentUser?.email,
              city,
            };
            console.log("userEidtInfo", userEditInfo);

            fetch(`http://localhost:5000/updateprofile`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify(userEditInfo),
            })
            
      });
  };

  return (
    <div>
      {/* <Button >Open modal</Button> */}
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MODAL_BODY>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Box className="edit-intro">
              <Typography component="h2" className="title">
                Edit intro
              </Typography>
              <IconButton className="clear-btn" onClick={handleClose}>
                <ClearIcon />
              </IconButton>
            </Box>
            <EDIT_CONTAINER spacing={3}>
              {/* profile img input start */}
              <Box>
                <Typography component="h2" className="titleLabel">
                  Profile Photo
                </Typography>
                <ISERT_FIELD>
                  <label htmlFor="file-input1">
                    <IconButton>
                      <GetAppIcon />
                    </IconButton>
                  </label>
                  <input
                    {...register("profileImg")}
                    // name="profilePhoto"
                    id="file-input1"
                    type="file"
                  />
                  {/* <TextField id="file-input" size='small' fullWidth type="file" /> */}
                </ISERT_FIELD>
              </Box>
              {/* LOCATION input end */}

              {/* cover photo  input start */}
              <Box>
                <Typography component="h2" className="titleLabel">
                  Cover Photo
                </Typography>
                <ISERT_FIELD>
                  <label
                    className={photoHandle?.coverPhoto ? "isFile" : undefined}
                    htmlFor="file-input2"
                  >
                    <IconButton>
                      <GetAppIcon />
                    </IconButton>
                  </label>
                  <input
                    {...register("coverImg")}
                    // onChange={handlephotoHandle}
                    // name="coverPhoto"
                    id="file-input2"
                    type="file"
                  />
                  {/* <TextField id="file-input" size='small' fullWidth type="file" /> */}
                </ISERT_FIELD>
              </Box>
              {/*cover photo  input end */}

              {/* name input start */}
              <Box>
                {/* <Typography component="h2">YOUR NAME</Typography> */}
                <TextField
                  size="small"
                  fullWidth
                  type="text"
                  label="your name"
                  defaultValue={currentUser.displayName}
                  disabled
                  // InputProps={{ readOnly: {currentUser.displayName}, disableUnderline: true }}
                />
              </Box>
              {/* name input end */}

              {/* title input start */}
              <Box>
                {/* <Typography component="h2">YOUR TITLE</Typography> */}
                <TextField
                  {...register("title")}
                  size="small"
                  fullWidth
                  type="text"
                  label="your title"
                />
              </Box>
              {/* title input end */}

              {/* CITY input start */}
              <Box>
                {/* <Typography component="h2">CITY</Typography> */}
                <TextField
                  {...register("city")}
                  size="small"
                  fullWidth
                  type="text"
                  label="city"
                />
              </Box>
              {/* CITY input end */}

              {/* LOCATION input start */}
              <Box>
                {/* <Typography component="h2">LOCATION</Typography> */}
                <TextField
                  {...register("location")}
                  size="small"
                  fullWidth
                  type="text"
                  label="location"
                />
              </Box>
              {/* LOCATION input end */}

              {/* phone number input start */}
              <Box>
                {/* <Typography component="h2">LOCATION</Typography> */}
                <TextField
                  {...register("phone")}
                  size="small"
                  fullWidth
                  type="number"
                  label="phone"
                />
              </Box>
              {/* phone number input end */}

              <Box className="submit-btn">
                <Button type="submit">Submit</Button>
              </Box>
            </EDIT_CONTAINER>
          </form>
        </MODAL_BODY>
      </Modal>
    </div>
  );
};

export default ProfileEditModal;
