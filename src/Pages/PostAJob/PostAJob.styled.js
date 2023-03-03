import { Box, Paper, styled } from "@mui/material";



export const POSTAJOBSCONTAINER = styled(Box)(({theme})=> ({
    display: 'grid',
    placeItems: 'center',
    background: '#38434F',
    padding: '3rem 1rem',
    // height: '100vh'
}))


// post container 
export const POSTCONTAINER = styled(Paper)(({theme})=> ({
    // background: 'red',
    minWidth: '500px',
    padding: '1rem 1.5rem',

    '& .title1': {
        fontSize: '1.75rem',
        fontWeight: 'bold'
    },
    '& .labelTitle': {
        color: 'rgba(0,0,0, 0.5)'
    },

    '& select': {
        padding: '0.75rem'
    }
}))

// next button for description routes
export const NEXTBUTTON = styled(Box)(({theme})=> ({
    // background: 'red',
    display: 'grid',
    placeItems: 'center',


    '& button': {
        background: theme.palette.primary.main,
        color: '#fff'
    },
    '& button:hover': {
        background: theme.palette.primary.main,
        color: '#fff'
    },
}))