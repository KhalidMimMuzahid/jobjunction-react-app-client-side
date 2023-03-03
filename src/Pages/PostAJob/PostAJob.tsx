import React, { useContext } from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import {
  NEXTBUTTON,
  POSTAJOBSCONTAINER,
  POSTCONTAINER,
} from "./PostAJob.styled";
import { SubmitHandler, useForm } from "react-hook-form";
import moment from "moment";
import { MyContext } from "../../context/MyProvider/MyProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import uploadImageToImageBB from "../../utilities/uploadImageToImageBB/uploadImageToImageBB";

// const navigate = useNavigate()

const PostAJob = () => {
  const { currentUser } = useContext(MyContext);
  type Inputs = {
    postDescription: string;
    jobDescription: string;
    companyName: string;
    imgFile: FileList;
    workplaceType: string;
    jobLocation: string;
    jobType: string;
    jobTitle: string;
    skillSetsString: string;
    requireMentsString: string;
    responsibilitiesString: string;
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const handleFormSubmit: SubmitHandler<Inputs> = (data) => {
    // console.log(data);

    const {
      companyName,
      imgFile,
      jobDescription,
      jobLocation,
      jobType,
      jobTitle,
      requireMentsString,
      responsibilitiesString,
      skillSetsString,
      workplaceType,
    } = data;
    const image = imgFile[0]
    uploadImageToImageBB(image)
      .then(res => res.json())
      .then(imgData => {
        const imgLink = imgData?.data?.display_url
        // const imageLink = imageData?.data?.display_url;
        if (imgLink) {
          let responsibilities = responsibilitiesString.split("###");
          let skillSets = skillSetsString.split("###");
          let requireMents = requireMentsString.split("###");
          const postDate = moment().format();
          // console.log(postDescription, "\n", postDate);
          const jobPost = {
            userEmail: currentUser?.email,
            jobTitle: jobTitle,
            companyName: companyName,
            companyImg: imgLink,
            jobDescription: jobDescription,
            postDate: postDate,
            skillSets: skillSets,
            requireMents: requireMents,
            responsibilities: responsibilities,
            jobType: jobType,
            workplaceType: workplaceType,
            jobLocation: jobLocation,
            questions: [],
            totalApplyed: [],
          }

          console.log(jobPost)
          // post job fetching 
          fetch(`${process.env.REACT_APP_server_link}/postajob`, {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify(jobPost)
          })
            .then(res => res.json())
            .then(data => {
              console.log(data)
              if (data.success) {
                toast.success("Job posted successfully")
                // navigate('/jobs')
                reset();
              }
            })
        }
        else {
          toast.error("something error happend")
        }
      })


  };


  return (
    <POSTAJOBSCONTAINER>
      <POSTCONTAINER>
        <Stack direction="column" spacing={2}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Box>
              <Typography className="title1" component="h3">
                Find a great hire, fast
              </Typography>
              <Typography className="title2" component="p">
                Rated #1 in increasing quality of hire.1
              </Typography>
            </Box>
            {/* job title section */}
            <Stack>
              <label className="labelTitle">Job title</label>
              <TextField
                {...register("jobTitle", {
                  required: "you must provide this field",
                })}
                label=""
                id="outlined-size-small"
                size="small"
              />
            </Stack>
            <Stack>
              <label className="labelTitle">Job Description</label>
              <TextareaAutosize
                {...register("jobDescription", {
                  required: "you must provide this field",
                })}
                aria-label="minimum height"
                minRows={5}
                placeholder="write here the job description?"
                style={{ width: "100%", paddingLeft: "10px" }}
              />
            </Stack>
            {/* Company input field section */}
            <Stack>
              <label className="labelTitle">Company Name</label>
              <TextField
                {...register("companyName", {
                  required: "you must provide this field",
                })}
                label=""
                id="outlined-size-small"
                size="small"
              />
            </Stack>

            <Stack>
              <label className="labelTitle">Company Logo</label>
              <TextField
                {...register("imgFile", {
                  required: "you must provide company logo",
                })}
                fullWidth
                id="outlined-basic"
                type="file"
              />
            </Stack>



            {/* requirments field section */}
            <Stack>
              <label className="labelTitle">Requirements</label>
              <TextField
                {...register("requireMentsString", {
                  required: "you must provide this field",
                })}
                label=""
                id="outlined-size-small"
                size="small"
                placeholder="separate them using ###"
              />
            </Stack>
            {/* skillsets field section */}
            <Stack>
              <label className="labelTitle">Skill Sets</label>
              <TextField
                {...register("skillSetsString", {
                  required: "you must provide this field",
                })}
                label=""
                id="outlined-size-small"
                size="small"
                placeholder="separate them using ###"
              />
            </Stack>
            {/* responsibilities field section */}
            <Stack>
              <label className="labelTitle">Responsibilities</label>
              <TextField
                {...register("responsibilitiesString")}
                label=""
                id="outlined-size-small"
                size="small"
                placeholder="separate them using ###"
              />
            </Stack>
            {/* Workplace type input field section */}
            <Stack>
              <label className="labelTitle">Workplace type</label>
              <select
                {...register("workplaceType", {
                  required: "you must provide this field",
                })}
              >
                <option value="On site">On site</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
              </select>
            </Stack>
            {/* Job location input field section */}
            <Stack>
              <label className="labelTitle">Job location</label>
              <TextField
                {...register("jobLocation", {
                  required: "you must provide this field",
                })}
                label=""
                id="outlined-size-small"
                size="small"
              />
            </Stack>
            {/* Job type select field section  */}
            <Stack>
              <label className="labelTitle">Job type</label>
              <select
                {...register("jobType", {
                  required: "you must provide this field",
                })}
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Volunteer">Volunteer</option>
                <option value="Internship">Internship</option>
              </select>
            </Stack>
            {/* next level button for description routes  */}.
            <NEXTBUTTON>
              <Button type="submit">Post job for free</Button>
            </NEXTBUTTON>
          </form>
        </Stack>
      </POSTCONTAINER>
    </POSTAJOBSCONTAINER>
  );
};

export default PostAJob;
