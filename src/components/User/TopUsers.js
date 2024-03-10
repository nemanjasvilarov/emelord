import React, { useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useForm } from 'react-hook-form';
import './TopUsers.css';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function TopUsers() {

    const [users, setUsers] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const axiosPrivate = useAxiosPrivate();
    const { register, handleSubmit, formState } = useForm({ 'mode': 'onChange' });

    const onSubmit = async (data) => {
        try {
            const response = await axiosPrivate.get(`users/top-users/${data.top}`);
            setUsers(response.data);
        } catch (err) {
            if (err.response.status === 400) {
                setErrorMessage('Top field was not found.');
            } else if (err.response.status === 500) {
                setErrorMessage(err.response.data)
            } else {
                setErrorMessage('There was an error that wasn\'t accounted for', err);
            }
        }

    }

    return (
        <section className='top-users-section'>
            <form className='top-users-form' onSubmit={handleSubmit(onSubmit)}>
                <h1>Top Users</h1>
                <label htmlFor="topUser">Select a range for top users:</label>
                <select
                    id='topUser'
                    {...register('top', { required: 'top field is required' })}
                    sx={{ width: '100px', height: '20px' }}
                >
                    <option value="">None</option >
                    <option value='5'>Top 5</option >
                    <option value='10'>Top 10</option >
                    <option value='15'>Top 15</option >
                </select>
                <Button type="submit" sx={{
                    color: '#fe7be5',
                    backgroundColor: '#c23373',
                    ":hover": {
                        backgroundColor: '#FF97C1', color: '#c23373'
                    },
                    marginLeft: '2%',
                    '@media (max-width:514px)': { width: '10%' }
                }} size="small" variant="contained">Select </Button>
                <br />
                {formState.errors.top && <p className='top-users-error'>{formState.errors.top.message}</p>}
                <br />
            </form>
            <TableContainer sx={{
                width: '32%', margin: '2% auto', background: ' rgba(230, 220, 220, 0.6)',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                position: 'relative',
                top: '8%',
                '@media (max-width:1536px)': { width: '42%' },
                '@media (max-width:1200px)': { width: '52%' },
                '@media (max-width:900px)': { width: '62%' },
                '@media (max-width:700px)': { width: '72%' },
                '@media (max-width:500px)': { marginTop: '0%' }
            }} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell align='center' sx={{ color: '#c23373', fontWeight: 'bold', width: '50%' }}>Username</TableCell>
                            <TableCell align='center' sx={{ color: '#c23373', fontWeight: 'bold', width: '50%' }}>Points</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map((user, index) => {
                            return (
                                <TableRow
                                    key={user.id}
                                >
                                    <TableCell align='center' sx={{ color: '#c23373', fontWeight: 'bold', width: '50%' }}>
                                        {user.username}
                                    </TableCell>
                                    <TableCell align='center' sx={{ color: '#c23373', fontWeight: 'bold', width: '50%' }}>{user.points}</TableCell>
                                </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    )
}

export default TopUsers