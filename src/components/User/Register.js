import { useState, useEffect } from "react";
import InfoIcon from '@mui/icons-material/Info';
import axios from '../../axios';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [validPassword, setValidMatchPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const { register, handleSubmit, formState, watch } = useForm({ 'mode': 'onChange' });
    let password = watch('password');
    let matchPassword = watch('matchPassword');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const result = await axios.post('/users/register', {
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.username,
                password: data.password,
                email: data.email
            },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
            setSuccess(true);
            setSuccessMessage(result.data.message);
            setErrorMessage([]);
            navigate('/login', { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrorMessage('No Server Response');
                setSuccess(false);
            } else {
                setErrorMessage(err.response.data);
                setSuccess(false);
            }
        }
    };

    useEffect(() => {
        const match = password === matchPassword;
        setValidMatchPassword(match);
    }, [password, matchPassword]);

    const closeAlert = () => {
        setErrorMessage(null);
    }

    return (
        <section className="register-section">
            <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                <h1>Register</h1>
                <label className="register-label" htmlFor="firstName">First name:</label>
                <TextField
                    variant="outlined"
                    size="small"
                    type='text'
                    id="firstName"
                    autoComplete='off'
                    margin="dense"
                    {...register('firstName', { required: 'First name is required', pattern: { value: /^[A-Z][a-z]{2,23}$/, message: 'First name can\'t contain numbers or have a lowercase first letter.' } })}

                />
                <p className="register-error">{formState.errors.firstName ? formState.errors.firstName.message : " "}</p>
                <label className="register-label" htmlFor="lastName">Last name:</label>
                <TextField
                    variant="outlined"
                    size="small"
                    type='text'
                    id="lastName"
                    autoComplete='off'
                    margin="dense"
                    {...register('lastName', { required: 'Last name is required', pattern: { value: /^[A-Z][a-z]{2,23}$/, message: 'Last name can\'t contain numbers  or have a lowercase first letter' } })}

                />
                <p className="register-error">{formState.errors.lastName ? formState.errors.lastName.message : " "}</p>
                <label className="register-label" htmlFor="email">Email:</label>
                <TextField
                    variant="outlined"
                    size="small"
                    type='text'
                    id="email"
                    autoComplete='off'
                    margin="dense"
                    {...register('email', { required: 'Email is required', pattern: { value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'Email must be valid.' } })}

                />
                <p className="register-error">{formState.errors.email ? formState.errors.email.message : " "}</p>
                <label className="register-label" htmlFor="username">Username:</label>
                <TextField
                    variant="outlined"
                    size="small"
                    type='text'
                    id="username"
                    autoComplete='off'
                    margin="dense"
                    {...register('username', { required: 'Username is required' })}

                />
                <p className="register-error">{formState.errors.username ? formState.errors.username.message : " "}</p>
                <label className="register-label" htmlFor="pwdRegister">Password:</label>
                <TextField
                    variant="outlined"
                    size="small"
                    type='password'
                    id="pwdRegister"
                    autoComplete='off'
                    margin="dense"
                    {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters long.' } })}

                />
                <p className="register-error">{formState.errors.password ? formState.errors.password.message : " "}</p>
                <label className="register-label" htmlFor="matchPassword">Confirm password:</label>
                <TextField
                    variant="outlined"
                    size="small"
                    type='password'
                    id="matchPassworde"
                    margin="dense"
                    autoComplete='off'
                    {...register('matchPassword', { required: 'Confirmation password is required' })}

                />
                <p className="register-error psw-match">{formState.errors.matchPassword ? formState.errors.matchPassword.message : " "}</p>
                {validPassword ? null : <p className="register-error"><InfoIcon /> {'Passwords need to match.'}</p>}
                <Button className="login-btn" type="submit" sx={{
                    color: '#fe7be5',
                    backgroundColor: '#c23373',
                    ":hover": {
                        backgroundColor: '#FF97C1', color: '#c23373'
                    },
                    margin: '4% auto'
                }} size="medium" variant="contained" disabled={formState.isValid && validPassword ? false : true}>Submit</Button>
            </form>
            {errorMessage ? Array.isArray(errorMessage) ?
                <Alert onClose={closeAlert} sx={{ minHeight: '5%', width: '40%', position: 'relative', margin: 'auto', '@media (max-width:1536px)': { width: '50%' }, '@media (max-width:1200px)': { width: '60%' }, '@media (max-width:900px)': { width: '70%' }, '@media (max-width:700px)': { width: '75%' } }} variant="filled" severity="error">
                    {
                        errorMessage.map((err, index) => {
                            return <p style={{ textAlign: 'left' }} key={index} className="error-messages">{err.message}</p>
                        })
                    }
                </Alert>
                : <Alert onClose={closeAlert} sx={{ minHeight: '5%', width: '100%', position: 'relative', margin: 'auto', '@media (max-width:1536px)': { top: '50%' }, '@media (max-width:1200px)': { width: '60%' }, '@media (max-width:900px)': { width: '70%' }, '@media (max-width:700px)': { width: '75%' } }} variant="filled" severity="error">{errorMessage.message}</Alert> : null
            }
        </section >
    );
}

export default Register;




