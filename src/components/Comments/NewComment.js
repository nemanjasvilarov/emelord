import React, { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './NewComment.css';
import Alert from '@mui/material/Alert';

const NewComment = (props) => {
    const [errorMessage, setErrorMessage] = useState();
    const axiosPrivate = useAxiosPrivate();
    const { register, handleSubmit, formState } = useForm({ 'mode': 'onChange' });

    const handleUpload = async (data) => {
        let comment = data.comment;
        let postId = props.postId;
        try {
            const result = await axiosPrivate.post(`/posts/${postId}/comments`, { comment });
            props.setPost(result.data);
        } catch (err) {
            setErrorMessage(err.response.data);
        }
    }
    const closeAlert = () => {
        setErrorMessage(null);
    }

    return (
        <>
            {errorMessage?.message && <Alert onClose={closeAlert} variant="filled" severity="error" sx={{ width: '100%', position: 'relative', top: '0', margin: 'auto' }}>{errorMessage.message}</Alert>}
            <form className="new-comment-form" onSubmit={handleSubmit(handleUpload)}>
                <h2>Add a comment</h2>
                <TextField
                    sx={{ '@media (max-width: 900px)': { marginBottom: '14%' } }}
                    variant="outlined"
                    type='text'
                    size="small"
                    id="username"
                    autoComplete='off'
                    margin="dense" type="text"  {...register('comment', { required: 'Comment is required.' })} />
                <p className='new-comment-form-error'>{formState.errors.comment && formState.errors.comment.message}</p>
                <Button type="submit" sx={{
                    color: '#fe7be5',
                    backgroundColor: '#c23373',
                    ":hover": {
                        backgroundColor: '#FF97C1', color: '#c23373'
                    },
                    marginTop: '1%',
                    '@media (max-width: 900px)': { marginTop: '5%' }
                }} size="medium" variant="contained" disabled={formState.isValid ? false : true}>Submit</Button>
            </form>
        </>
    );
}

export default NewComment;