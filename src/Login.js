import React from 'react';
import "./Login.css"
import {Button} from '@material-ui/core';
import {auth,provider} from './firebase';
import { actiontypes } from './reducer';
import {useStateValue} from './StateProvider';
const Login = () => {

    const [{},dispatch] =useStateValue('');
    const signin =()=>
    {
            auth.signInWithPopup(provider)
            .then((result)=>{
                dispatch({
                    type:actiontypes.SET_USER,
                    user:result.user,
                })
            })
            .catch((error)=> alert(error.message));
    }
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://efficientcauseblog.files.wordpress.com/2015/09/whatsapp-logo-hd-2_zpsts9uk4vv.png"
                alt=""/>
           <div className="login__Text">
            <h1>Sign in to Whatsup</h1>
           </div>
           <Button  onClick={signin}>SIGN IN WITH GOOGLE </Button>
           </div>
        </div>
    );
};

export default Login;