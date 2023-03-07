import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  IconButton,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  FORMCONTAINER,
  PASSWORDFEILDCONTAINER,
  SOCIALICONSCONTAINER,
  SUBMITBUTTON,
} from "./SignUp.styled";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { MyContext } from "../../context/MyProvider/MyProvider";
import uploadImageToImageBB from "../../utilities/uploadImageToImageBB/uploadImageToImageBB";
import uploadProfileToMongoDB from "../../utilities/uploadProfileToMongoDB/uploadProfileToMongoDB";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import checkAlreadyUser from "../../utilities/checkAlreadyUser/checkAlreadyUser";

export default function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState("");
  const [emailPasswordSignUpError, setEmailPasswordSignUpError] =
    React.useState("");
  const [isSignUpLoading, setIsSignUpLoading] = React.useState(false);
  const [googleSignInError, setGoogleSignInError] = React.useState("");
  const { createUserWithEmail, updateUserProfile, currentUser, googleSignIn } =
    React.useContext(MyContext);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  type Inputs = {
    email: string;
    password: string | number;
    name: string;
    imgFile: FileList;
    confirmPassword: string | number;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (value?.password === value?.confirmPassword) {
        setPasswordError("");
      } else {
        setPasswordError("password should be match");
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleFormSubmit: SubmitHandler<Inputs> = (data) => {
    const { name, email, imgFile, password, confirmPassword } = data;
    setEmailPasswordSignUpError("");
    // setGoogleSignInError("");
    if (data.password !== data.confirmPassword) {
      setPasswordError("password should be match");
      return;
    }
    setIsSignUpLoading(true);

    const image = imgFile[0];
    console.log(data);

    createUserWithEmail(email, password)
      .then((userCredential: any) => {
        // user created succesfully
        const user = userCredential.user;
        console.log("user", user);
        const uid = user?.uid;
        // if user provide an image then ,
        if (image) {
          // image upload to image BB
          uploadImageToImageBB(image)
            .then((res) => res.json())
            .then((imageData) => {
              // console.log("image data", imageData);
              const imageLink = imageData?.data?.display_url;
              // console.log("imageLink", imageLink);
              // if image succesfully uploaded the image link have a link otherwise have a undefined value
              // if image succesfully uploaded , then ,
              if (imageLink) {
                const userInfo = {
                  displayName: name,
                  photoURL: imageLink,
                };
                // update user additional info ((displayName) and photoURL) to firebase
                updateUserProfile(userInfo)
                  .then(() => {
                    // if profile succesfully uploaded
                    // console.log("Profile updated!");
                    // console.log("currentUser", currentUser);
                    const userInfoForDB = {
                      name: name,
                      email: email,
                      role: "user",
                      profilePhoto: imageLink,
                      uid: uid,
                      title: "web developer",
                      allFriends: [],
                      pendingReq: [],
                    };
                    // upload user info to mongodb database
                    uploadProfileToMongoDB(userInfoForDB)
                      .then((res) => res.json())
                      .then((data) => {
                        if (data?.acknowledged) {
                          // if user info succesfully updated to database
                          setIsSignUpLoading(false);
                          toast.success("user created successfully");
                          navigate("/my-profile");
                        }
                      });
                  })
                  .catch((error: any) => {
                    // An error occurred
                    // ...
                  });
              } else {
                // if there have any problem to get image Link from imageBB
                toast.error(
                  "your photo could not be uploaded.\nyou may upload later."
                );
                const userInfo = {
                  displayName: name,
                };
                // update user additional info (displayName) to firebase
                updateUserProfile(userInfo)
                  .then(() => {
                    // if profile succesfully updated
                    console.log("Profile updated!");
                    console.log("currentUser", currentUser);
                    const userInfoForDB = {
                      name: name,
                      email: email,
                      role: "user",
                      profilePhoto: "",
                      uid: uid,
                      title: "web developer",
                      allFriends: [],
                      pendingReq: [],
                    };
                    // upload user info to mongodb database
                    uploadProfileToMongoDB(userInfoForDB)
                      .then((res) => res.json())
                      .then((data) => {
                        if (data?.acknowledged) {
                          setIsSignUpLoading(false);
                          toast.success("user created successfully");

                          navigate("/my-profile");
                        }
                      });
                  })
                  .catch((error: any) => {
                    // An error occurred
                    // ...
                  });
              }
            });
        } else {
          // if the image is not provided by the user
          const userInfo = {
            displayName: name,
          };
          // update user additional info (displayName) to firebase
          updateUserProfile(userInfo)
            .then(() => {
              // if profile succesfully updated
              // console.log("Profile updated!");
              // console.log("currentUser", currentUser);
              const userInfoForDB = {
                name: name,
                email: email,
                role: "user",
                profilePhoto: "",
                uid: uid,
                title: "web developer",
                allFriends: [],
                pendingReq: [],
              };
              // upload user info to mongodb database
              uploadProfileToMongoDB(userInfoForDB)
                .then((res) => res.json())
                .then((data) => {
                  if (data?.acknowledged) {
                    toast.success("user created successfully");
                    navigate("/my-profile");
                    setIsSignUpLoading(false);
                  }
                });
            })
            .catch((error: any) => {
              // An error occurred
              // ...
            });
        }

        // ...
      })
      .catch((error: any) => {
        // could not sign up with any issue
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log("errorMessage", errorMessage);

        setEmailPasswordSignUpError(errorMessage);
        setIsSignUpLoading(false);

        // ..
      });
  };
  const logInWithGoogle = () => {
    setEmailPasswordSignUpError("");
    setGoogleSignInError("");
    // console.log("clicked");
    setIsSignUpLoading(true);
    googleSignIn()
      .then((result: any) => {
        const user = result.user;
        // console.log("user", user);

        const userInfoForDB = {
          name: user.displayName,
          email: user.email,
          profilePhoto: user.photoURL,
          uid: user.uid,
          role: "user",
          allFriends: [],
          pendingReq: [],
        };
        // check this user is already have in database or not
        checkAlreadyUser(user.uid)
          .then((res) => res.json())
          .then((data) => {
            if (!data.isUserAlreadyExists) {
              // if the user is not already in database
              // console.log("the user is not already in database");
              // upload user info to mongodb database
              uploadProfileToMongoDB(userInfoForDB)
                .then((res) => res.json())
                .then((data) => {
                  if (data?.acknowledged) {
                    setIsSignUpLoading(false);
                    // toast.success("user created successfully");
                    setTimeout(() => {
                      navigate("/my-profile");
                    }, 100);
                  }
                });
            } else {
              // if the user is already in database
              // console.log("the user is already in database");
              setIsSignUpLoading(false);
              // toast.success("user created successfully");
              setTimeout(() => {
                navigate("/feed");
              }, 100);
            }
          });
      })
      .catch((error: any) => {
        const errorMessage = error.message;
        // console.log("errorMessage", errorMessage);
        setGoogleSignInError(errorMessage);
        setIsSignUpLoading(false);
        return;
      });
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#6D9AC4",
        padding: "2rem 1rem",
      }}
    >
      <FORMCONTAINER onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack direction="column" spacing={2}>
          <Typography className="sTitle" component="h3">
            Sign UP
          </Typography>

          {/* name input field section */}
          <Paper>
            <TextField
              type="text"
              {...register("name", {
                required: "Name is required",
              })}
              fullWidth
              id="outlined-basic"
              label="Your Name"
            />
          </Paper>
          {errors?.name && (
            <p role="alert" style={{ color: "red", fontWeight: 700 }}>
              {/* Name is required */}
              {errors?.name?.message}
            </p>
          )}
          {/* email input field section */}
          <Paper>
            {/* email input feild section */}
            <TextField
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              fullWidth
              id="outlined-basic"
              label="Email"
            />
          </Paper>
          {errors?.email && (
            <p role="alert" style={{ color: "red", fontWeight: 700 }}>
              {/* Name is required */}
              {errors?.email?.message}
            </p>
          )}
          {/* img field  */}
          <Paper>
            <TextField
              {...register("imgFile")}
              fullWidth
              id="outlined-basic"
              type="file"
            />
          </Paper>
          {/* password input field section */}
          <PASSWORDFEILDCONTAINER>
            <Box sx={{ position: "relative" }}>
              <TextField
                {...register("password", {
                  required: {
                    value: true,
                    message: "Please enter your password",
                  },
                  minLength: {
                    value: 6,
                    message: "Password Contain at least 6 characters",
                  },
                })}
                fullWidth
                id="outlined-basic"
                label="Password"
                type={showPassword ? "text" : "password"}
              />

              {/* hide or showing  password toggle btn   */}
              <IconButton
                className="showHideBtn"
                sx={{ position: "absolute", top: 0, right: 0 }}
                onClick={handleClickShowPassword}
              >
                <Button>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </Button>
              </IconButton>
            </Box>
          </PASSWORDFEILDCONTAINER>
          {errors?.password && (
            <p role="alert" style={{ color: "red", fontWeight: 700 }}>
              {/* Name is required */}
              {errors?.password?.message}
            </p>
          )}
          {/* confirm password field section */}

          <PASSWORDFEILDCONTAINER>
            <Box sx={{ position: "relative" }}>
              <TextField
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Please enter your confirmPassword",
                  },
                })}
                fullWidth
                id="outlined-basic"
                label="Password"
                type={showConfirmPassword ? "text" : "password"}
              />

              {/* hide or showing  password toggle btn   */}
              <IconButton
                className="showHideBtn"
                sx={{ position: "absolute", top: 0, right: 0 }}
                onClick={handleClickShowConfirmPassword}
              >
                <Button>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </Button>
              </IconButton>
            </Box>
          </PASSWORDFEILDCONTAINER>

          {/* <Paper>
            <TextField
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Please enter your confirmPassword",
                },
              })}
              fullWidth
              type="password"
              label="confirm password"
            />
          </Paper> */}
          {errors?.confirmPassword && (
            <p role="alert" style={{ color: "red", fontWeight: 700 }}>
              {/* Name is required */}
              {errors?.confirmPassword?.message}
            </p>
          )}
          {passwordError && !errors?.confirmPassword && (
            <p role="alert" style={{ color: "red", fontWeight: 700 }}>
              {passwordError}
            </p>
          )}
          {emailPasswordSignUpError && (
            <p role="alert" style={{ color: "red", fontWeight: 700 }}>
              {emailPasswordSignUpError}
            </p>
          )}
          {/* type button field  */}

          <SUBMITBUTTON>
            <Button
              type="submit"
              defaultValue="Submit"
              disabled={isSignUpLoading}
            >
              Submit
            </Button>
          </SUBMITBUTTON>
          {isSignUpLoading && (
            <>
              <Box sx={{ width: "100%" }}>
                <Loader type="progressor" />
              </Box>
            </>
          )}

          {/* divider  */}
          <Box>
            <Divider>
              <Chip label="OR" />
            </Divider>
          </Box>

          {/* GOOGLE, GITHUB */}
          <SOCIALICONSCONTAINER direction="row" spacing={1}>
            <IconButton onClick={logInWithGoogle}>
              <GoogleIcon fontSize="medium" />
            </IconButton>
            <Typography component="span">&</Typography>
            <IconButton>
              <GitHubIcon fontSize="medium" />
            </IconButton>
          </SOCIALICONSCONTAINER>
        </Stack>
      </FORMCONTAINER>
    </Box>
  );
}
