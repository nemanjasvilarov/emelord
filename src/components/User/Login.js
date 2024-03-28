import { useState } from "react";
import axios from '../../axios';
import { useForm } from 'react-hook-form';
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

const Login = () => {

    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const { register, handleSubmit, formState } = useForm({ 'mode': 'onChange' });

    const onSubmit = async (data) => {
        let username = data.username;
        let password = data.password;
        try {
            const result = await axios.post('/users/login',
                {
                    username,
                    password
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const accessToken = result?.data?.accessToken;
            setAuth({ username, accessToken });
            navigate('/posts', { replace: true });
        } catch (err) {
            setErrorMessage(err.response.data);
        }
    };

    const closeAlert = () => {
        setErrorMessage(null);
    }

    return (
        < section className="login-section">
            <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                <h1>Login</h1>
                <label className="login-label" htmlFor="username">Username:</label>
                <TextField
                    variant="outlined"
                    type='text'
                    size="small"
                    id="username"
                    autoComplete='off'
                    margin="dense"
                    sx={{ '@media (max-width:900px)': { marginBottom: '4%' }, '@media(max-width:400px)': { marginTop: '0' } }}
                    {...register('username', { required: 'Username is required.', type: { value: String, message: 'Username must be a string.' } })}
                />
                <p className="login-error">{formState.errors.username ? formState.errors.username.message : ""}</p>
                <label className="login-label" htmlFor="pwdLogin">Password:</label>
                <TextField
                    variant="outlined"
                    size="small"
                    type='password'
                    id="pwdLogin"
                    autoComplete='off'
                    margin="dense"
                    sx={{ '@media (max-width:900px)': { marginBottom: '4%' }, '@media(max-width:400px)': { marginTop: '0' } }}
                    {...register('password', { required: 'Password is required.', minLength: { value: 8, message: 'Password must be at least 8 characters long.' } })}
                />
                <p className="login-error" >{formState.errors.password ? formState.errors.password.message : ""}</p>
                <Button className="login-btn" type="submit" sx={{
                    color: '#fe7be5',
                    backgroundColor: '#c23373',
                    ":hover": {
                        backgroundColor: '#FF97C1', color: '#c23373'
                    },
                    marginTop: '3%',
                }} size="medium" variant="contained" disabled={formState.isValid ? false : true}>Submit</Button>
            </form>
            {errorMessage ? Array.isArray(errorMessage) ?
                <Alert onClose={closeAlert} sx={{ position: 'relative', top: '30%', width: '30.8%', margin: 'auto', '@media (max-width:1536px)': { width: '40%' }, '@media (max-width:1200px)': { width: '50%' }, '@media (max-width:900px)': { width: '70%' } }} variant="filled" severity="error">
                    {
                        errorMessage.map((err, index) => {
                            return <p key={index} style={{ textAlign: 'left' }} className="error-messages">{err.message}</p>
                        })
                    }
                </Alert>
                : <Alert onClose={closeAlert} sx={{ position: 'relative', top: '30%', margin: 'auto', width: '30.8%', '@media (max-width:1536px)': { width: '40%' }, '@media (max-width:1200px)': { width: '50%' }, '@media (max-width:900px)': { width: '70%' } }} variant="filled" severity="error">{errorMessage.message}</Alert> : null
            }
        </section >
    );
}

export default Login;



