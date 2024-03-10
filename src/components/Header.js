import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import DiamondIcon from '@mui/icons-material/Diamond';
import "./Header.css";
import { useState } from "react";

export default function Header() {

    const { auth } = useAuth();
    const [hide, setHide] = useState(false);

    const onClickHandler = () => {
        setHide(!hide);
    }

    let protectedLinks = auth.username ?
        <div id="links">
            <Link className="link-style" to='/posts'>Posts</Link>
            <Link className="link-style" to='/user'>User details</Link>
            <Link className="link-style" to='/users-top'>Top Users</Link>
            <Link className="link-style" to='/logout'>Logout</Link>
        </div>
        : <div id="links">
            <Link className="link-style" to='/login'>Login</Link>
            <Link className="link-style" to='/register'>Register</Link>
        </div>;

    return (
        <>
            <div id='nav'>
                <div className="div-h1-icon">
                    <span className="nav-icon">  <DiamondIcon /></span>
                    <h1 className="nav-h1">emelord</h1>
                </div>
                <h1 className="nav-h1-II">emelord</h1>
                <span className="nav-icon-II" onClick={onClickHandler}>  <DiamondIcon sx={{ '&:hover': { color: '#fe1ff1' } }} /></span>
                {protectedLinks}
            </div>
            {
                hide && (<div className="nav-menu" >
                    {protectedLinks}
                </div>)
            }
        </>
    )
}
