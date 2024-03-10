import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import "./Posts.css";
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

const Posts = () => {

    const { auth } = useAuth();
    const [posts, setPosts] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();
    const axiosPrivate = useAxiosPrivate();

    const handleLikeOnClick = async (id) => {
        try {
            const response = await axiosPrivate.put(`/posts/${id}/like`);
            let updatedPost = response.data;
            const updatedPosts = [...posts];
            updatedPosts.forEach(post => {
                if (post._id === updatedPost._id) {
                    post.pictureApproved = updatedPost.pictureApproved;
                    post.pictureUnapproved = updatedPost.pictureUnapproved;
                }
            });
            setPosts(updatedPosts);
        } catch (err) {
            setErrorMessage(err.response.data);
        }
    };

    const handleDislikeOnClick = async (id) => {
        try {
            const response = await axiosPrivate.put(`/posts/${id}/dislike`);
            let updatedPost = response.data;
            const updatedPosts = [...posts];
            updatedPosts.forEach(post => {
                if (post._id === updatedPost._id) {
                    post.pictureUnapproved = updatedPost.pictureUnapproved;
                    post.pictureApproved = updatedPost.pictureApproved;
                }
            });
            setPosts(updatedPosts);
        } catch (err) {
            setErrorMessage(err.response.data);
        }
    };

    const handelDeletePost = async (postId) => {
        try {
            const response = await axiosPrivate.delete(`/posts/${postId}`);
            let newPost = response.data;
            let updatedPosts = posts.filter(post => post._id !== newPost._id);
            setPosts(updatedPosts);
        } catch (err) {
            setErrorMessage(err.response.data);
        }
    };

    useEffect(() => {
        const getPosts = async () => {
            try {
                const result = await axiosPrivate.get('/posts');
                setPosts(result.data);
            } catch (err) {
                setErrorMessage(err.response.data);
            }
        }
        getPosts();
    }, []);

    return (
        <div className='posts'>
            <p className='p-new-post'> <InsertPhotoIcon sx={{ color: '#9400ff' }} /> <Link className='link-new-post' to='/new-post'>Add a new Post</Link></p>
            <section className='posts-section'>
                {posts.length ?
                    posts.map((post, index) => {
                        return (
                            <Card sx={{
                                maxWidth: 400, margin: '1% auto', background: ' rgba(230, 220, 220, 0.6)',
                                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', paddingBottom: '5%', position: 'relative',
                                '@media(max-width:400px)': { width: '300px' }
                            }} key={post._id}>
                                <CardHeader
                                    sx={{ color: '#c23372', fontWeight: 'bold' }}
                                    avatar={
                                        <Avatar sx={{ bgcolor: '#c23372' }} aria-label="recipe">
                                            {post.username[0]}
                                        </Avatar>
                                    }
                                    title={'Posted by: ' + post.username}
                                />
                                <CardMedia
                                    sx={{
                                        width: '100% !important',
                                        height: 'auto !important'
                                    }}
                                    component="img"
                                    image={post.imgUrl}
                                    alt='user post'
                                />
                                <CardActions sx={{ display: 'flex', justifyContent: 'center' }} disableSpacing>
                                    <IconButton onClick={() => handleLikeOnClick(post._id)} aria-label="like">
                                        <Badge sx={{
                                            "& .MuiBadge-badge": {
                                                backgroundColor: "#435334"
                                            }, zIndex: '0'
                                        }} badgeContent={post.pictureApproved ? post.pictureApproved.length : 0} color="secondary">
                                            <FavoriteIcon sx={{
                                                color: '#c23372',
                                                '&:hover': {
                                                    color: '#fe7be5'
                                                }
                                            }} />
                                        </Badge>
                                    </IconButton>
                                    <IconButton onClick={() => handleDislikeOnClick(post._id)} aria-label="dislike">
                                        <Badge sx={{
                                            "& .MuiBadge-badge": {
                                                backgroundColor: "#BB2525"
                                            }, zIndex: '0'
                                        }} badgeContent={post.pictureUnapproved ? post.pictureUnapproved.length : 0} color="secondary">
                                            <HeartBrokenIcon sx={{
                                                color: '#c23372',
                                                '&:hover': {
                                                    color: '#fe7be5'
                                                }
                                            }} />
                                        </Badge>
                                    </IconButton>
                                    <IconButton sx={{
                                        color: '#C70039', '&:hover': {
                                            color: '#FF6969'
                                        }
                                    }} disabled={auth.username === post.username ? false : true} onClick={() => handelDeletePost(post._id)} aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                                <Link className='link-comments' to='/comments' style={{ display: 'inline-block', position: 'relative', bottom: '0' }} state={{ postId: post._id }}>See comments for this post</Link>
                            </Card>)
                    }) : <p>There are no posts at the moment.</p>
                }
            </section >
        </div >
    );
}

export default Posts;