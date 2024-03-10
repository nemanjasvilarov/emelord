import React, { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import './EditComment.css';

const EditComment = (props) => {

    const [errorMessage, setErrorMessage] = useState();
    const axiosPrivate = useAxiosPrivate();
    const { register, handleSubmit, formState } = useForm({ 'mode': 'onChange' });

    const handleUpload = async (data) => {
        let comment = data.comment;
        let postId = props.postId;
        try {
            const result = await axiosPrivate.put(`/posts/${postId}/comments/${props.commId}`, { comment });
            props.setPost(result.data);
            props.setComponent(null);
        } catch (err) {
            setErrorMessage(err.response.data);
        }
    }

    const closeAlert = () => {
        setErrorMessage(null);
    }

    return (
        <>
            <form className="edit-comment-form" onSubmit={handleSubmit(handleUpload)}>
                <h2>Edit a comment</h2>
                <TextField
                    variant="outlined"
                    type='text'
                    size="small"{...register('comment', { required: 'Comment is required.' })} defaultValue={props.comm} required />
                <p className="edit-comment-error">{formState.errors.comment && formState.errors.comment.message}</p>
                <Button type='submit' sx={{
                    color: '#fe7be5',
                    backgroundColor: '#c23373',
                    paddingTop: '0px',
                    ":hover": {
                        backgroundColor: '#FF97C1', color: '#c23373'
                    },
                    marginTop: '3%',
                    '@media(max-width:900px)': { marginTop: '8%' }
                }} size="medium" variant="contained" disabled={formState.isValid ? false : true}>Submit</Button>
            </form>
            {errorMessage?.message ? <Alert onClose={closeAlert} variant="filled" severity="error" sx={{ width: '100%', marginTop: '2%' }}>{errorMessage.message}</Alert> : null}
        </>
    );
}

export default EditComment;