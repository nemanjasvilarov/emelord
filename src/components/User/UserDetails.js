import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import ComputerIcon from '@mui/icons-material/Computer';
import MailIcon from '@mui/icons-material/Mail';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import './UserDetails.css';
import { autocompleteClasses } from '@mui/material';

export default function UserDetails() {
    const { auth } = useAuth();
    const [userDetails, setUserDetails] = useState({});
    const axiosPrivate = useAxiosPrivate();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const response = await axiosPrivate.get(`/users/${auth.username}`);
                setUserDetails(response.data);
            } catch (err) {
                if (err.response.status === 401) {
                    navigate('/login');
                } else {
                    setErrorMessage(err.response.data);
                }
            }
        }

        getUserDetails();

    }, []);

    return (
        <section className='user-details-section'>
            <List sx={{
                width: 360,
                bgcolor: 'background.paper',
                position: 'relative',
                top: '30%',
                margin: 'auto',
                borderImageSlice: '1',
                borderImageSource: 'linear-gradient(to left, #c23373, #d53a9d)',
                borderStyle: 'solid',
                borderWidth: '1px 9px 6px 3px',
                background: ' rgba(230, 220, 220, 0.6)',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                '@media (max-width: 400px)': { width: '300px' }
            }}>
                <h1 className='details-h1'>User details</h1>
                <ListItem >
                    <ListItemAvatar>
                        <Avatar sx={{ backgroundColor: '#fe7be5' }}>
                            <PersonIcon sx={{ color: '#c23372' }} />
                        </Avatar>
                    </ListItemAvatar>
                    <p className='details'>First name: <span className='details-data'>{userDetails.firstName}</span></p>
                    <p className='details'>Last name: <span className='details-data'>{userDetails.lastName}</span></p>
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                    <ListItemAvatar>
                        <Avatar sx={{ backgroundColor: '#fe7be5' }}>
                            <ComputerIcon sx={{ color: '#c23372' }} />
                        </Avatar>
                    </ListItemAvatar>
                    <p className='details'>Username: <span className='details-data'>{userDetails.username}</span></p>
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                    <ListItemAvatar>
                        <Avatar sx={{ backgroundColor: '#fe7be5' }}>
                            <MailIcon sx={{ color: '#c23372' }} />
                        </Avatar>
                    </ListItemAvatar>
                    <p className='details'>Email: <span className='details-data'>{userDetails.email}</span></p>
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                    <ListItemAvatar>
                        <Avatar sx={{ backgroundColor: '#fe7be5' }}>
                            <LoyaltyIcon sx={{ color: '#c23372' }} />
                        </Avatar>
                    </ListItemAvatar>
                    <p className='details'>Points: <span className='details-data'>{userDetails.points}</span></p>
                </ListItem>
            </List >
            <p>{errorMessage ? errorMessage.message : null}</p>
        </section>
    )
}
