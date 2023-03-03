import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react'
import Loader from '../../../Components/Loader/Loader';
import { useNavigate } from 'react-router-dom';

const MoreJob = () => {

    // const [allJobs, setAllJobs] = useState([])

    const navigate = useNavigate()

    const { data: allJobs = [], isLoading, error } = useQuery({
        queryKey: [''],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/getalljobs')
            const data = await res.json()
            // console.log("result:" , data)
            // setAllJobs(data?.data)
            return data.data.reverse()
        }
    })

    console.log(allJobs)

    if (isLoading) {
        return <Loader type="" />
    }

    // const datas1 = [
    //     {
    //         name: "MERN Developer",
    //         image: "https://media.licdn.com/dms/image/C4E0BAQGyqhhBHOf2XQ/company-logo_100_100/0/1625272333522?e=1684972800&v=beta&t=So6VTqdzR--PvrSP5pW-RBvx_llXTrEGEQAm4NVtXqc",
    //         c_name: "CBTS",
    //         location: "Washington, DC (Remote)",
    //         time: "Now"
    //     },
    //     {
    //         name: "MERN Stack Developer",
    //         image: "https://media.licdn.com/dms/image/C4E0BAQHLbXvWKmvvrg/company-logo_100_100/0/1653297275586?e=1684972800&v=beta&t=hWwiLnqiMSuguqenJ3fHccUZnnJdtxbbHLneLb0eSTA",
    //         c_name: "American Technology Consulting - ATC",
    //         location: "Chicago, IL (Hybrid)",
    //         time: "12 Hour's ago"
    //     },
    //     {
    //         name: "Web Developer",
    //         image: "https://media.licdn.com/dms/image/C560BAQGUNIyRZFaj0g/company-logo_100_100/0/1657049194250?e=1684972800&v=beta&t=eZ7KElFx61i25xGp5LJNiRQIfqZdcCpJwtTZvE6Eg74",
    //         c_name: "Brain Station 23",
    //         location: "Dhaka, Bangladesh (Remote)",
    //         time: "1 Hour's ago"
    //     },
    //     {
    //         name: "Foull Stack Developer",
    //         image: "https://media.licdn.com/dms/image/C4D0BAQF53y2mahFyEw/company-logo_100_100/0/1573672272355?e=1684972800&v=beta&t=vlGac1v0fGeoRT1Op3A0nwwYgaGQsIhoB6HyexyDj5U",
    //         c_name: "DICE",
    //         location: "San Francisco Bay Area (Remote)",
    //         time: "Now"
    //     }
    // ]


    return (
        <div style={{ border: "2px solid lightGray", backgroundColor: "white", borderRadius: "1em", marginBottom: "1em" }}>

            {/* recommendetion start */}
            <div>

                {/* header section */}
                <Box sx={{ m: 1, p: 2 }} >
                    <Typography variant="h6" sx={{ fontWeight: "600" }}>
                        All opportunities
                    </Typography>
                    <Typography variant="body2">
                        Because you expressed interest in remote work
                    </Typography>
                </Box>


                {/* data's map */}
                {allJobs
                    && allJobs?.map((job: any) => <Box key={job?._id} onClick={() => navigate(`/jobs/${job?._id}`)}>
                        <Box sx={{ margin: ".5em 1em", display: "flex", alignItems: "center", gap: "1em" }}>

                            <Avatar
                                variant='square'
                                alt="image"
                                src={job?.companyImg}
                                sx={{ width: 56, height: 56, cursor: "pointer" }}
                            />

                            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", width: "100%", gap: "1em" }}>
                                <Box>
                                    <Typography variant='h6' sx={{ color: "red", m: "0", p: "0", cursor: "pointer" }}>
                                        {job?.jobTitle}
                                    </Typography>

                                    <Typography variant='body2'>
                                        {job?.companyName}
                                    </Typography>
                                    <Typography variant='subtitle2' sx={{ color: "gray" }}>
                                        {job?.jobLocation}
                                    </Typography>
                                    <Typography variant='body2' sx={{ color: "green" }}>
                                        {job?.workplaceType}
                                    </Typography>
                                </Box>

                                <Box sx={{ p: '7px', ":hover": { backgroundColor: "lightGray", borderRadius: "100%", cursor: "pointer" }, display: 'flex', placeItems: "center" }}>
                                    <TurnedInNotIcon sx={{}} />
                                </Box>

                            </div>

                            {/* divider */}
                        </Box>
                        <Divider variant="middle" />
                    </Box>
                    )}



                {/* show all button */}
                <Button sx={{ p: "10px", color: "gray", fontWeight: "700" }} fullWidth variant="text">
                    Show All
                    <ArrowForwardIcon />
                </Button>

            </div>
        </div>
    );
};

export default MoreJob;