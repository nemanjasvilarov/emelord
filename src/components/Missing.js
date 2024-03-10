import React from 'react'
import { Link } from 'react-router-dom';
import './Missing.css';

export default function Missing() {
    return (
        <>
            <div className='missing-div'>
                <h1 className='missing-h1'>This page doesn't exist!</h1>
                <Link className='missing-link-to-posts' to='/posts'>
                    Go back to posts.
                </Link>
            </div>

        </>
    )
}
