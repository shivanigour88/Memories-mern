import React, { useState , useEffect } from 'react'
import {Link , useLocation} from 'react-router-dom';
import { AppBar, Avatar, Button, Typography ,Toolbar} from '@material-ui/core';
import useStyles from './styles.js';
import memories from '../../images/memories.png';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';



const Navbar = () => {
    const classes = useStyles();
    const[user , setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();


    const logout = ()=>{
      dispatch( {type : 'LOGOUT'}); 
      navigate('/auth');
      setUser(null);
    };
    
    useEffect(()=>{
      const token = user?.token;

      if(token){
        const decodedToken = jwtDecode(token);
        if( decodedToken.exp *1000 < new Date().getTime()) logout();
      }

      setUser(JSON.parse(localStorage.getItem('profile')));
    },[location]);

  return (
    <AppBar className = {classes.appBar} position= "static" color="inherit">
    <div className = {classes.brandContainer}>
     <Typography component={Link} to = "/" className={classes.heading} variant="h2" align= "center">Memories</Typography>
     <img className= {classes.image} src={memories} alt = "memories" height= "60"/>
    </div>
    <Toolbar className = {classes.toolbar}>
      {user ? (
       <div className = {classes.profile}>
        <Avatar className={classes.purple} alt = {user.result.name} src = {user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
        <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
        <Button className={classes.logout} variant='contained' color='secondary' onClick={logout}>Logout</Button>
       </div>
      ): (
          <Button component={Link} to = '/auth' color = "primary" variant='contained'>Sign in</Button>
      ) }
    </Toolbar>
   </AppBar>
  )
}

export default Navbar
