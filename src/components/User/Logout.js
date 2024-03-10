import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth'

export default function Logout() {

    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        setAuth({});
        const loggingOut = async () => {
            setIsLoading(false);
            try {
                await axiosPrivate.post('/users/logout');
                navigate('/login', { replace: true });
            } catch (err) {
                if (err.response.status === 403) {
                    console.log('403');
                    window.location.reload();
                } else {
                    setErrorMessage(err.response.data);
                }
            }
        }
        loggingOut();
    }, [])

    return (
        <React.Fragment>
            {
                isLoading ? <p>Logging out....</p> : errorMessage ? <p>{errorMessage.messsage}</p> : null
            }

        </React.Fragment>
    )
}
