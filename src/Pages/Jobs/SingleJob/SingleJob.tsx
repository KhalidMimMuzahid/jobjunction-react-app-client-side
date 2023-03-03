import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useLoaderData } from 'react-router-dom';

const SingleJob = () => {
    const data: any = useLoaderData()

    const { companyImg, companyName, jobDescription, jobLocation, jobTitle, postDate, userEmail, requireMents, responsibilities, skillSets } = data?.data

    const splitedTime = postDate.split('T')

    console.log(data.data)

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{}}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <img style={{ width: "50%", margin: "0 auto" }} src={companyImg} alt="" />
                </div>
                <h1>Vacancy: {jobTitle}</h1>
                <h3>Post Date: {splitedTime[0]}</h3>
                <h3>Company Name: {companyName}</h3>
                <h3>Job Description: {jobDescription}</h3>

                <h3>Requirements: {requireMents?.map((req: any) => <li>{req}</li>)}</h3>

                <h3>Needed Skills: {skillSets?.map((skill: any) => <li>{skill}</li>)}</h3>

                <h3>Responseibility: {responsibilities?.map((res: any) => <li>{res}</li>)}</h3>

                <h3>Job Location: {jobLocation}</h3>
                <h3>Contact Email: {userEmail}</h3>

                <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "4em", marginTop: "1em" }}>
                    <Button variant='outlined'>Apply</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default SingleJob;