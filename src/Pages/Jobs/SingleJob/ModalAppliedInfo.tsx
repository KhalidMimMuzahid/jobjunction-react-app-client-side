import React, { useContext } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import GetAppIcon from '@mui/icons-material/GetApp';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from "react-toastify";
import { MyContext } from "../../../context/MyProvider/MyProvider";
import { EDIT_CONTAINER, MODAL_BODY } from "../../MyProfile/MyProfileMain/ProfileEditModal/ProfileEditModal.styled";



const ModalAppliedInfo = (props: any) => {
    const { open, setOpen, handleOpen, handleClose } = props
    const [allInputDatas, setAllInputData] = React.useState<any>({})
    const { currentUser } = React.useContext(MyContext);

 
    type Inputs = {
        profileImg: FileList;
        coverImg: FileList;
        experience: number;
        ctc: number;
        expectedSalary: number;
        phone: number | string;
        noticePeriod: number;
        resumeLink: string;
    };

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<Inputs>();



    const handleFormSubmit: SubmitHandler<Inputs> = (data) => {
        console.log("allllll daaaaa", data)
        // const { experience, phone , ctc } = data;
    }



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
                                <Typography sx={{textTransform: 'uppercase'}} component="h2" className="title">applicant form</Typography>
                                <IconButton className='clear-btn' onClick={handleClose}>
                                    <ClearIcon />
                                </IconButton>
                            </Box>
                        <EDIT_CONTAINER spacing={3} sx={{margin: '1rem 0'}}>
                            {/* name input start */}
                            <Box>
                                {/* <Typography component="h2">YOUR NAME</Typography> */}
                                <TextField
                                    size='small'
                                    fullWidth type="text"
                                    label='Applicant name'
                                    defaultValue={currentUser.displayName}
                                    disabled
                                // InputProps={{ readOnly: {currentUser.displayName}, disableUnderline: true }}

                                />
                            </Box>

                            {/* name input end */}

                            {/* email input start */}
                            <Box>
                                {/* <Typography component="h2">YOUR NAME</Typography> */}
                                <TextField
                                    size='small'
                                    fullWidth type="text"
                                    label='Applicant email'
                                    defaultValue={currentUser.email}
                                    disabled
                                // InputProps={{ readOnly: {currentUser.displayName}, disableUnderline: true }}

                                />
                            </Box>
                            {/* email input end */}


                            {/* title input start */}
                            <Box>
                                {/* <Typography component="h2">YOUR TITLE</Typography> */}
                                <TextField
                                    {...register("experience")}
                                    size='small' fullWidth type="number" label='Job Experience * years' />
                            </Box>
                            {/* title input end */}

                            {/* CTC input start */}
                            <Box>
                                {/* <Typography component="h2">CITY</Typography> */}
                                <TextField
                                    {...register("ctc")} 
                                    size='small' fullWidth type="number" label='CTC *' />
                            </Box>
                            {/* CTC input end */}

                            {/* LOCATION input start */}
                            <Box>
                                {/* <Typography component="h2">LOCATION</Typography> */}
                                <TextField
                                    {...register("expectedSalary")}
                                    size='small' fullWidth type="number" label='expected salary *' />
                            </Box>
                            {/* LOCATION input end */}

                            {/* phone number input start */}
                            <Box>
                                {/* <Typography component="h2">LOCATION</Typography> */}
                                <TextField
                                    {...register("phone")}
                                    size='small' fullWidth type="number" label='phone *' />
                            </Box>
                            {/* phone number input end */}

                            {/* Notice period  input start */}
                            <Box>
                                {/* <Typography component="h2">LOCATION</Typography> */}
                                <TextField
                                    {...register("noticePeriod")}
                                    size='small' fullWidth type="number" label='noticePeriod *' />
                            </Box>
                            {/* Notice period input end */}

                            {/* resume link  input start */}
                            <Box>
                                {/* <Typography component="h2">LOCATION</Typography> */}
                                <TextField
                                    {...register("resumeLink")}
                                    size='small' fullWidth type="number" label='your resume link*' />
                            </Box>
                            {/* resume link input end */}

                            <Box className="submit-btn">
                                <Button type='submit'>Submit</Button>
                            </Box>

                        </EDIT_CONTAINER>
                    </form>
                </MODAL_BODY>
            </Modal>
        </div>
    );
};

export default ModalAppliedInfo;