import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function Links() {

    const { auth } = useAuth();

    let protectedLinks = auth.username ?
        <>
            <Link to='/posts'>Posts</Link>
            <Link to='/user'>User details</Link>
            <Link to='/logout'>Logout</Link>
        </>
        : <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
        </>;

    return (

        <div id='nav'>
            <h1>Emelord</h1>
            {protectedLinks}
        </div>
    )
}

