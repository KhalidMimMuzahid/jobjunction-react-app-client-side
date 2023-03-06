// import React from "react";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import WorkIcon from "@mui/icons-material/Work";
import Container from "@mui/material/Container";
import { MyContext } from "../../context/MyProvider/MyProvider";
import { SearchContext } from "../../context/SearchPovider/SearchPovider";
import { useHaveIJobPost } from "../../useHooks/useHaveIJobPost/useHaveIJobPost";
// interface IPROPS {
//   setSearchBarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   setSearchKey: React.Dispatch<React.SetStateAction<string>>;
// }
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  border: "1px solid black",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

// const Navbar: React.FC<IPROPS> = () => {

const Navbar = () => {
  const { setSearchBarIsOpen, setSearchKey } = React.useContext(SearchContext);
  const [searchInput, setSearchInput] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const { currentUser, logOut } = React.useContext(MyContext);
  const { haveIJobPost, isLoading } = useHaveIJobPost();
  // console.log(currentUser);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleSignOut = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error: any) => {
        // An error happened.
      });
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link
        to={"/my-profile"}
        style={{ textDecoration: "none", color: "black" }}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>
      <Link
        to={"/my-profile/my-resume"}
        style={{ textDecoration: "none", color: "black" }}
      >
        <MenuItem onClick={handleMenuClose}>My Resume</MenuItem>
      </Link>
      {/* haveIJobPost, isLoading */}
      {!isLoading && haveIJobPost && (
        <Link
          to={"/my-job-post"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <MenuItem onClick={handleMenuClose}>My job post</MenuItem>
        </Link>
      )}
      <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
      <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link to="/messaging" style={{ textDecoration: "none" }}>
        <MenuItem sx={{ textDecoration: "none", color: "black" }}>
          <IconButton
            sx={{ textDecoration: "none" }}
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <MailIcon sx={{ textDecoration: "none" }} />
            </Badge>
          </IconButton>
          <Typography sx={{ textDecoration: "none" }}>Messages</Typography>
        </MenuItem>
      </Link>
      <Link to="/my-network" style={{ textDecoration: "none" }}>
        <MenuItem sx={{ textDecoration: "none", color: "black" }}>
          <IconButton
            sx={{ textDecoration: "none" }}
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <RecordVoiceOverIcon sx={{ textDecoration: "none" }} />
            </Badge>
          </IconButton>
          <Typography sx={{ textDecoration: "none" }}>My Network</Typography>
        </MenuItem>
      </Link>
      <Link to="/jobs" style={{ textDecoration: "none" }}>
        <MenuItem sx={{ textDecoration: "none", color: "black" }}>
          <IconButton
            sx={{ textDecoration: "none" }}
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <WorkIcon sx={{ textDecoration: "none" }} />
            </Badge>
          </IconButton>
          <Typography sx={{ textDecoration: "none" }}>Jobs</Typography>
        </MenuItem>
      </Link>

      {/* <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const handleSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (searchInput) {
      setSearchBarIsOpen(true);
      setSearchKey(searchInput);
    }
    // console.log(searchInput);
  };
  const handleInputChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = (e) => {
    if (!e.target.value) {
      setSearchBarIsOpen(false);
      setSearchKey("");
    }
    setSearchInput(e.target.value);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        // position: "fixed",
        // top: "0px",
        // left: "0px",
        // right: "0px",
        // zIndex: "1000",
        // backgroundColor: "#FFFFFF",
      }}
    >
      <AppBar
        position="static"
        sx={{ background: "#FFFFFF" }}
        style={{ padding: "0px" }}
      >
        {/* <Box sx={{ maxWidth: "lg", marginX: "auto" }}> */}
        <Container maxWidth="lg">
          <Toolbar style={{ padding: "0px" }}>
            {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          > */}
            {/* <MenuIcon /> */}

            <Link
              style={{
                textDecoration: "none",
              }}
              to={"/feed"}
            >
              <Box sx={{ display: "flex", placeItems: "center" }}>
                <Avatar
                  src="https://i.ibb.co/6FzXScD/JJ.png"
                  sx={{ width: 42, height: 42 }}
                  variant="rounded"
                  alt="job junction"
                >
                  {/* <AssignmentIcon /> */}
                </Avatar>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    display: { xs: "none", lg: "block" },
                    ml: "5px",
                    color: "#535353",
                    ":hover": { color: "#000000" },
                    fontWeight: 900,
                  }}
                >
                  Jub_Junction
                </Typography>
              </Box>
            </Link>
            <form onSubmit={handleSearch}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  name="searchInput"
                  id="searchInput"
                  onChange={handleInputChange}
                  inputProps={{ "aria-label": "search" }}
                  sx={{
                    color: "black",
                  }}
                />
              </Search>
            </form>

            <Box sx={{ flexGrow: 1 }} />
            <Box
              sx={{
                display: "flex",
                gap: "10px",
              }}
            >
              <Link
                to={"/messaging"}
                style={{ textDecoration: "none", margin: "0px 5px" }}
              >
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    flexDirection: "column",
                    placeItems: "center",
                    position: "relative",
                    top: "4px",
                    color: "#535353",
                    ":hover": { color: "#000000" },
                  }}
                >
                  <Box>
                    <Badge badgeContent={4} color="error">
                      <MailIcon />
                    </Badge>
                  </Box>
                  <Typography
                    variant="h1"
                    noWrap
                    component="div"
                    sx={{
                      display: { xs: "none", sm: "block" },
                      textDecoration: "none",
                      mt: "0px",
                      padding: "0px",
                      fontSize: "14px",
                      fontWeight: 300,
                      position: "relative",
                      top: "0px",
                    }}
                    style={{ fontWeight: 300 }}
                  >
                    Message
                  </Typography>
                </Box>
              </Link>
              <Link
                to={"/my-network"}
                style={{ textDecoration: "none", margin: "0px 5px" }}
              >
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    flexDirection: "column",
                    placeItems: "center",
                    position: "relative",
                    top: "4px",
                    color: "#535353",
                    ":hover": { color: "#000000" },
                  }}
                >
                  <Box color="inherit">
                    <Badge badgeContent={4} color="error">
                      <RecordVoiceOverIcon />
                    </Badge>
                  </Box>
                  <Typography
                    variant="h1"
                    noWrap
                    component="div"
                    sx={{
                      display: { xs: "none", sm: "block" },
                      textDecoration: "none",
                      mt: "0px",
                      padding: "0px",
                      fontSize: "14px",
                      position: "relative",
                      top: "0px",
                    }}
                    style={{ fontWeight: 300 }}
                  >
                    My Network
                  </Typography>
                </Box>
              </Link>
              <Link
                to={"/jobs"}
                style={{ textDecoration: "none", margin: "0px 5px" }}
              >
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    flexDirection: "column",
                    placeItems: "center",
                    position: "relative",
                    top: "4px",
                    color: "#535353",
                    ":hover": { color: "#000000" },
                  }}
                >
                  <Box color="inherit">
                    <Badge badgeContent={4} color="error">
                      <WorkIcon />
                    </Badge>
                  </Box>
                  <Typography
                    variant="h1"
                    noWrap
                    component="div"
                    sx={{
                      textDecoration: "none",
                      display: { xs: "none", sm: "block" },

                      mt: "0px",
                      padding: "0px",
                      fontSize: "14px",

                      position: "relative",
                      top: "0px",
                    }}
                    style={{ fontWeight: 300 }}
                  >
                    Jobs
                  </Typography>
                </Box>
              </Link>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  placeItems: "center",
                  position: "relative",
                  top: "4px",
                  margin: "0px 5px",
                  color: "#535353",
                  ":hover": { color: "#000000", cursor: "pointer" },
                }}
              >
                <Box color="inherit">
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </Box>
                <Typography
                  variant="h1"
                  noWrap
                  component="div"
                  sx={{
                    textDecoration: "none",
                    display: { xs: "none", sm: "block" },
                    mt: "0px",
                    padding: "0px",
                    fontSize: "14px",
                    fontWeight: 300,
                    position: "relative",
                    top: "0px",
                  }}
                  style={{ fontWeight: 300 }}
                >
                  Notification
                </Typography>
              </Box>

              {/* <Link to="/signin" style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  flexDirection: "column",
                  placeItems: "center",
                  position: "relative",
                  top: "4px",
                  margin: "0px 5px",
                  color: "#535353",
                  ":hover": { color: "#000000" },
                }}
              >
                <Box color="inherit">
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </Box>
                <Typography
                  variant="h1"
                  noWrap
                  component="div"
                  sx={{
                    textDecoration: "none",
                    display: { xs: "none", sm: "block" },
                    mt: "0px",
                    padding: "0px",
                    fontSize: "16px",
                    fontWeight: 100,
                    position: "relative",
                    top: "0px",
                  }}
                  style={{ fontWeight: 300 }}
                >
                  Join
                </Typography>
              </Box>
            </Link> */}

              {/* <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton> */}
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  placeItems: "center",
                  position: "relative",
                  top: "4px",
                  margin: "0px 5px",
                }}
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {/* https://i.ibb.co/XxdjZXt/profile-Demo.png */}
                <Avatar
                  sx={{
                    width: 42,
                    height: 42,
                    position: "relative",
                    top: "-5px",
                  }}
                  alt="profile"
                  src={`${
                    currentUser?.photoURL
                      ? currentUser?.photoURL
                      : "https://i.ibb.co/XxdjZXt/profile-Demo.png"
                  } `}
                />
                {/* <AccountCircle
                fontSize="large"
                sx={{ position: "relative", top: "-5px" }}
              /> */}
              </Box>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
          {renderMobileMenu}
          {renderMenu}
          {/* </Box> */}
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
