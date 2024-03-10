import { useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import "./NewPost.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

const NewPost = () => {

    const axiosPrivate = useAxiosPrivate();
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm({ 'mode': 'onChange' });

    const handleUpload = async (data) => {
        const formData = new FormData();
        formData.append('image', data.image[0]);
        let image = formData;
        try {
            const result = await axiosPrivate.post('/posts',
                image,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );
            navigate('/posts');
        } catch (err) {
            setErrorMessage(err.response.data);
        }
    }

    return (
        <section className='new-post-section'>
            <form className='new-post-form' onSubmit={handleSubmit(handleUpload)} encType="multipart/form-data">
                <h1>Add a Post</h1>
                <input type='file'  {...register('image', {
                    required: 'Image is required.',
                    validate: {
                        lessThen10MB: files => files[0].size < 10000000 || 'The max image size is 10MB',
                        accpetedFormats: files =>
                            ['image/jpeg', 'image/png']
                                .includes(files[0]?.type) || 'File can be image of type JPEG and PNG.'
                    }
                })} />
                <p className="new-post-error">{formState.errors.image && formState.errors.image.message}</p>
                <Button className="login-btn" type="submit" sx={{
                    color: '#fe7be5',
                    backgroundColor: '#c23373',
                    ":hover": {
                        backgroundColor: '#FF97C1', color: '#c23373'
                    },
                    marginTop: '3%',
                }} size="medium" variant="contained" disabled={formState.isValid ? false : true}>Submit picture</Button>
            </form >
            {errorMessage?.message && <Alert sx={{ position: 'relative', top: '15%', margin: 'auto', width: '30%', '@media (max-width: 1536px)': { width: '40%' }, '@media (max-width: 1200px)': { width: '50%' }, '@media (max-width: 900px)': { width: '60%' }, '@media (max-width: 700px)': { width: '70%' }, '@media (max-width: 500px)': { width: '90%' } }} variant="filled" severity="error">{errorMessage.message}</Alert>}
        </section>
    )
}

export default NewPost