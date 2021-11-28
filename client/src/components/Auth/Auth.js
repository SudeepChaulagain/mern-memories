import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate} from 'react-router-dom'
import { Avatar, Button, Container, Grid, Input, Paper, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Inputs from './Inputs'
import {GoogleLogin} from 'react-google-login'
import useStyles from './styles'
import Icon from './icon'
import { AUTH } from '../../constants/actionTypes'
import { signin, signup } from '../../actions/auth'

const initialState= {firstName:'', lastName:'', email:'', password:'', confirmPassword:''}

const Auth = () => {
    const classes = useStyles()
    const [isSignUp, setIsSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(initialState)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit =  (e)=> {
        e.preventDefault()
        if (isSignUp) {
            dispatch(signup(formData, navigate))
        }
        else{
            dispatch(signin(formData, navigate))
        }
    }
    const handleChange = (e)=> {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleShowPassword = ()=>{
        setShowPassword((prevShowPassword)=> !prevShowPassword)
    }

    const googleSuccess = async (res)=> {
        console.log(res)
        const result = res?.profileObj
        const token = res?.tokenId
        try {
            dispatch({type: AUTH, payload: {result, token}})
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const googleError = ()=>{
        console.log('Google Sign In was unsuccessful. Please try again!')
    }
    const switchMode = ()=>{
        setIsSignUp((prevIsSignup)=> !prevIsSignup)
        handleShowPassword(false)
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5" component="h1">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                            <Inputs name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                            <Inputs name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Inputs name="email" label="Email" handleChange={handleChange} type="email"/>
                        <Inputs name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text': 'password'} handleShowPassword={handleShowPassword}/>
                        {isSignUp && <Inputs name="confirmPassword" label="Confirm Password" type="password"/>}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
                    <GoogleLogin 
                    clientId="129664605729-bnrnql65pc4paj0t1t7pniela2jpjbjl.apps.googleusercontent.com"
                    render={(renderProps)=>(
                        <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained">
                            Google Sign In
                        </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleError}
                    cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have an account ? Sign In': "Don't have an account ? Sign Up"}
                            </Button>
                        </Grid>    
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
