import { Box, styled } from "@mui/material";


export const MY_PROFILE_CONTAINER = styled(Box)(({ theme }) => ({
    width: "100%",
    marginTop: "1em",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    '& .userImg_and_bgImg_container': {
        position: "relative",
        top: "0",
        left: "0"
    },
    '& .Card': {
        background: '#fff',
        border: "1px dashed #ff1714",
        borderRadius: "7px",
        boxShadow: "1px 2px 3px #ff1714",
        // padding: "5px 8px",

    },
    '& .userName':{
        fontSize: '2rem',
        fontWeight: 900,

    },

}))



export const BACKGROUND_PROFILE_IMG_CONTAINER = styled(Box)(({ theme }) => ({
    width: '100%',
    position: 'relative',
    top: '0',
    left: '0',
    '& .bgImgContainer button': {
        position: 'absolute',
        bottom: '-50px',
        right: '10px',
        color: '#ff1714',
        border: '1px solid #ff1714'
    },
    '& .profileImg': {
        position: "absolute",
        bottom: "-40px",
        left: "-10px",
        width: "156px",
        height: "156px",
        margin: "0px 40px",
        border: "3px solid white",
        '@media (max-width:600px)': {
            width: '100px',
            height: '100px',
          },
    },
    '& .bgImgContainer': {
        height: '200px',
        '@media (max-width:600px)': {
            height: '150px',
          },
    }
    // zIndex: '-1'
}))