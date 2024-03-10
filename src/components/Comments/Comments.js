import React, { useEffect, useState } from "react";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useLocation } from "react-router-dom";
import NewComment from "./NewComment";
import EditComment from "./EditComment";
import useAuth from "../../hooks/useAuth";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './Comments.css';

const Comments = () => {

    const { auth } = useAuth();
    const [renderComponent, setRenderComponent] = useState();
    const [post, setPost] = useState({});
    const [errorMessage, setErrorMessage] = useState();
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const postId = location.state.postId;

    useEffect(() => {
        const getPost = async () => {
            try {
                const result = await axiosPrivate.get(`/posts/${postId}`);
                setPost(result.data);
            } catch (err) {
                setErrorMessage(err.response.data);
            }
        }
        getPost();
    }, []);

    const handleEditButton = (postId, commentId, comment) => {
        setRenderComponent({
            comId: commentId, component: (<><Box display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"><IconButton sx={{
                    color: '#c23372',
                    '&:hover': {
                        color: '#fe7be5'
                    }
                }} onClick={handleCloseEditBUtton}>< HighlightOffIcon /></IconButton></Box><EditComment postId={postId} commId={commentId} comm={comment} setComponent={setRenderComponent} setPost={setPost} /></>)
        });
    }

    const handleCloseEditBUtton = () => {
        setRenderComponent(null);
    }

    const handleDeleteButton = async (postId, commId) => {
        try {
            const result = await axiosPrivate.delete(`/posts/${postId}/comments/${commId}`);
            setPost(result.data);
        } catch (err) {
            setErrorMessage(err.response.data);
        }
    }

    return (
        <>
            <section className="comments-section">
                <div className="img-div">
                    <img src={post.imgUrl} alt='user post' />
                </div>
                <div className="comments-div">
                    <NewComment postId={post._id} setPost={setPost} />
                    {
                        post.comments?.length > 0 ?
                            post.comments.map((com, index) => {
                                return (
                                    <Card sx={{
                                        width: '90%', minHeight: '50%', margin: '1% auto', background: ' rgba(230, 220, 220, 0.6)',
                                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                                        padding: '0', display: 'flex', flexDirection: 'column', justifyContent: 'center'
                                    }} key={index}>
                                        <CardContent>
                                            {renderComponent && renderComponent?.comId === com._id ? renderComponent.component :
                                                (<><Typography sx={{
                                                    color: '#c23369 '
                                                }} gutterBottom variant="h5" component="div">
                                                    {com && com.username}
                                                </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {com && com.comment}
                                                    </Typography></>)
                                            }
                                        </CardContent>
                                        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <IconButton sx={{
                                                color: '#c23372',
                                                '&:hover': {
                                                    color: '#fe7be5'
                                                }
                                            }} disabled={auth.username === com.username ? false : true} onClick={() => handleEditButton(post._id, com._id, com.comment)}><EditIcon /></IconButton>
                                            <IconButton sx={{
                                                color: '#BB2525',
                                                '&:hover': {
                                                    color: '#FF6969'
                                                }
                                            }} disabled={auth.username === com.username ? false : true} onClick={() => handleDeleteButton(post._id, com._id)}><DeleteIcon /></IconButton>
                                        </CardActions>
                                    </Card>
                                )
                            }) : <p className="no-comments-paragraph">There are no comments at the moment.</p>
                    }
                </div>
                {errorMessage && <p>{errorMessage.message}</p>}
            </section >
        </>
    );
}

export default Comments;