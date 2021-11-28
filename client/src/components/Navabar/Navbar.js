import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import memories from '../../images/memories.png';
import useStyles from './styles';
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes';
import decode from 'jwt-decode'

const Navbar = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    useEffect(()=>{
        const token  = user?.token
        if (token) {
            const decodedToken = decode(token)

            if (decodedToken.exp * 1000 < new Date().getTime()) logout()
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const logout = ()=>{
        dispatch({type:LOGOUT})
        setUser(null)
        navigate('/')
       
    }

    return (
        <AppBar className={classes.appBar} color="inherit" position="static">
            <div className={classes.brandContainer}>
                <Typography variant="h2" align="center" className={classes.heading} component={Link} to="/">
                    Memories
                </Typography>
                <img src={memories} alt="memories" height="60" className={classes.image}/>
            </div>

            <Toolbar className={classes.toolbar}>
                {user?.result ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ): (
                    <Button component={Link} to="/auth" variant="contained" color="primary">
                        Sign In
                    </Button>    
                )}

            </Toolbar>
        </AppBar>
    )
}

export default Navbar
