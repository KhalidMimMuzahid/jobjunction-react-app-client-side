import React, { useContext, useEffect } from 'react';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import SentimentSatisfiedSharpIcon from '@mui/icons-material/SentimentSatisfiedSharp';
// import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import { COMMENT_CONTAINER, COMMENT_INPUT_CONTAINER, USER_COMMENT_CONTAINER } from './UserComment.styled';
import { MyContext } from '../../../../../context/MyProvider/MyProvider';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../../../Components/Loader/Loader';
import { toast } from 'react-toastify';


type UserCommentProps = {
    id: any
}

const UserComment: React.FunctionComponent<UserCommentProps> = (props) => {

    const { id } = props
    const { currentUser } = useContext(MyContext);

    const { photoURL, displayName, email } = currentUser
    // console.log(currentUser)

    const { data: allComments, error, isLoading, refetch } = useQuery({
        queryKey: [id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/comments?id=${id}`)
            const data = await res.json()
            // console.log(data.data)
            return (data.data.reverse())
        }
    })
    // useEffect(() => {
    //     fetch(`http://localhost:5000/comments?id=${id}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             // console.log(data)
    //             // setAllComments(data.data.reverse())
    //             console.log(data.data.length)
    //         })
    // }, [])

    // const { comment, commnenterName, commnenterPhoto } = allComments;

    
    
    
    const handelComment = (e: any) => {
        e.preventDefault()
        // const form = e.target
        const comment = e.target.comment.value;
        
        const info = {
            commnenterName: displayName,
            commnenterEmail: email,
            commnenterPhoto: photoURL,
            comment,
            id
        }

        fetch('http://localhost:5000/comment', {
            method: "PUT",
            headers: {
                'content-type': "application/json",
                info: JSON.stringify(info)
            }
        })
        .then(res => res.json())
        .then(data => {
                console.log(data)
                e.target.reset()
                toast.success("Comment added succesfully")
                refetch()
            })
    }

    // console.log(allComments)
    
    if (isLoading) {
        return <Loader type="" />
    }


    return (
        <COMMENT_CONTAINER spacing={3}>
            {/* <Avatar alt="raju" src={photoURL} /> */}
            <form onSubmit={handelComment} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                // flexWrap: 'wrap'
                
            }}>
                <Box className="input-area" sx={{ flexGrow: 1 }}>
                    {/* comment input field start */}
                    <Box sx={{ display: 'flex', flexWrap: 'nowrap' }}>
                        <TextField name='comment' placeholder='write a comment' fullWidth size='small' type='text' />
                        <IconButton>
                            <SentimentSatisfiedSharpIcon />
                        </IconButton>
                        <IconButton>
                            <PhotoCameraOutlinedIcon />
                        </IconButton>
                        <IconButton>
                            <GifBoxOutlinedIcon />
                        </IconButton>
                    </Box>
                    {/* comment input field end */}
                </Box>
                <Box className="send-btn">
                    <Button type='submit'>Send</Button>
                </Box>
            </form>

            {
                allComments &&
                allComments.slice(0, 2)?.map((comment:any, i:any) => {
                    return <USER_COMMENT_CONTAINER key={i}>
                        <Box>
                            <Avatar alt="photoURL" src={comment?.commnenterPhoto} />
                        </Box>
                        <Box className="comment">
                            <Box className="userName">
                                <Typography component="h3">{comment?.commnenterName}</Typography>
                            </Box>
                            <Box>
                                <Typography component="p">{comment?.comment}</Typography>
                            </Box>
                        </Box>
                    </USER_COMMENT_CONTAINER>
                })
            }

        </COMMENT_CONTAINER>
    );
};

export default UserComment;