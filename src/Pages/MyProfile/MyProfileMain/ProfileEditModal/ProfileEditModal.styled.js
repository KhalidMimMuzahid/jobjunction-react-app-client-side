import { Stack, styled, Box } from "@mui/material";


export const EDIT_CONTAINER = styled(Stack)(({ theme }) => ({ 
    overflowY: 'scroll',
    height: '500px',
    padding: '1rem 0',
    '& .clear-btn:hover': {
        border: '1px solid #ff1714',
        backgroundColor: '#ff1714',
        color: '#fff',
        fontWeight: 'bold',
        transition: '8ms'
    },

    '& .titleLabel': {
        color: 'black',
        fontWeight: 'bold',
        fontSize: '1rem'
    },

    '& .submit-btn button': {
        backgroundColor: '#ff1714',
        color: '#fff',
        padding: '5px 20px',
        borderRadius: '50px'
    },
    '& .submit-btn:hover button': {
        backgroundColor: '#ff1714',
        color: '#fff',
        padding: '5px 20px',
        borderRadius: '50px',
        boxShadow: '1px 1.5px 7px #ff1714'
    }


}))


export const MODAL_BODY = styled(Box)(({ theme }) => ({
    overflow: 'hidden',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "600px",
    height: '600px',
    backgroundColor: '#fff',
    border: '2px solid #ff1714',
    boxShadow: "2px 2px 10px #ddd",
    padding: "1rem",
    borderRadius: '25px',
    '@media (max-width:600px)': {
        width: '100%',
      },
      '& .edit-intro': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #ff1714',
        padding: '1rem',
        boxShadow: '1px 1px 2px #ff1714',
    },
    '& .title': {
        color: 'black',
        fontWeight: 'bold',
        fontSize: '1.25rem'
    },
    '& .clear-btn': {
        border: '1px solid #ff1714',
        transition: '1s'
    },

}))


export const ISERT_FIELD = styled(Stack)(({ theme }) => ({
    // '& #file-input1, #file-input2': {
    //     display: 'none'
    // },
    '& label': {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1.5px dashed #ddd',
        borderRadius: '5px',
        padding: '.75rem',
        boxShadow: '1px 1px 7px #ddd',
        transition: '7ms'
    },
    '& .isFile': {
        border: "2px solid #1919",
        boxShadow: '1.5px 2px 5px #1919'
    },
    '& label:hover button': {
        color: '#ff1714',
        boxShadow: '2px 2px 10px #ff1714',
        transition: '7ms'
    },
    '& label:hover ': {
        color: '#ff1714',
        cursor: 'pointer',
        transition: '7ms',
        boxShadow: '2px 2px 10px #ddd',
    }
}))