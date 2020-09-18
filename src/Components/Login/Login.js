import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import Header from '../Header/Header';
import "./Login.css";
import googleIcon from "../../travel-guru-resources/Icon/google.png";
import faIcon from "../../travel-guru-resources/Icon/fb.png";
import { UserContext } from '../../App';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { facebookSignIn, initializeFirebaseFramework, googleSignIn, handleLoginSystem, handleRegisterSystem } from '../Firebase/Firebase';




const Login = () => {

    initializeFirebaseFramework();

    const [newUser, setNewUser] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const handleResponse = (response, redirect) => {

        
        const userInfo = {...loggedInUser, response};
        setLoggedInUser(userInfo);

        if(redirect){
            history.replace(from);
        }

    }



    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {

        // register system fro new user
        if(newUser){

            handleRegisterSystem(data)
            .then(response => {

                if(response.success){
                    
                    const registerUserInfo = {...loggedInUser}
                    registerUserInfo.name = data.firstName + " " + data.lastName;
                    registerUserInfo.email = data.email;
                    registerUserInfo.password = data.password;
                    registerUserInfo.success = true;
                    registerUserInfo.error = "";

                    setLoggedInUser(registerUserInfo);
                    history.replace(from);

                }
                else{

                    const registerUserInfoError = {...loggedInUser}
                    registerUserInfoError.success = false;
                    registerUserInfoError.error = response.error;

                    setLoggedInUser(registerUserInfoError);

                }


                    
            })
        
        }
        if(!newUser){

            handleLoginSystem(data.email, data.password)
            .then(response => {
                
                
                if(response.success){
                    
                    const loginUserInfo = {...loggedInUser}
                    loginUserInfo.email = data.email;
                    loginUserInfo.password = data.password;
                    loginUserInfo.success = true;
                    loginUserInfo.error = "";

                    setLoggedInUser(loginUserInfo);
                    history.replace(from);

                }
                else{

                    const loginUserInfoError = {...loggedInUser}
                    loginUserInfoError.success = false;
                    loginUserInfoError.error = response.error;

                    setLoggedInUser(loginUserInfoError);

                }
    
            })


        }


    }



    console.log(loggedInUser);

    
    const handleFacebookSignIn = () => {
        
        facebookSignIn()
        .then(response => {
            
            if(response.success && response.email){

                
                const facebookSignInUser = {...loggedInUser}
                facebookSignInUser.name = response.name;
                facebookSignInUser.email = response.email;
                facebookSignInUser.img = response.img;
                facebookSignInUser.success = true;
                facebookSignInUser.error = "";
                setLoggedInUser(facebookSignInUser);
                history.replace(from);
            }
            else{
        

                const facebookSignInUserError = {...loggedInUser}
                facebookSignInUserError.success = false;
                facebookSignInUserError.error = response.error;

                setLoggedInUser(facebookSignInUserError);            }

        })

    }


    const handleGoogleSignIn = () => {
        
        googleSignIn()
        .then(response => {

            if(response.success && response.email){


                const googleSignInUser = {...loggedInUser}
                googleSignInUser.name = response.name;
                googleSignInUser.email = response.email;
                googleSignInUser.img = response.img;
                googleSignInUser.success = true;
                googleSignInUser.error = "";
                setLoggedInUser(googleSignInUser);
                history.replace(from);

              }
              else{
        

                const googleSignInError = {...loggedInUser}
                googleSignInError.success = false;
                googleSignInError.error = response.error;

                setLoggedInUser(googleSignInError);  
            }

        })

    }












    return (
        <Container>
            <div className="login-section">
                <Header></Header>
                <div className="login-system">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">

                            {
                                loggedInUser.error && <p style={{color: "red", textAlign: "center", fontSize: "20px"}}>{loggedInUser.error}</p>
                            }


                            {
                                newUser 
                                ? <div className="register-form">
                                <h3>Create an account</h3>
                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <input type="text" id="firstName" name="firstName" ref={register({ required: "First name is required"})} placeholder="First name"/>
                                    {errors.firstName && <span className="error">{errors.firstName.message}</span>}


                                    <input type="text" name="lastName" ref={register({ required: "Last name is required"})} placeholder="Last name"/>
                                    {errors.lastName && <span className="error">{errors.lastName.message}</span>}


                                    <input type="email" name="email" ref={register({ 
                                        required: "Email field is required",
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: "Please provide valid email address"
                                        }
                                        })} placeholder="Email address"/>
                                    {errors.email && <span className="error">{errors.email.message}</span>}

                                    <input type="password" name="password" ref={register({
                                        required: "Password field is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password containing at least 8 characters"
                                        },
                                        pattern: {
                                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                                            message: "Password containing characters, number, upper and lowercase"
                                        }
                                        })} placeholder="Password"/>
                                    {errors.password && <span className="error">{errors.password.message}</span>}

                                    <input type="password" name="rePassword" ref={register({
                                        required: "Confirm password field is required",
                                        validate: (value) => value === watch("password") || "Passwords do not match"
                                    })} placeholder="Confirm password"/>
                                    {errors.rePassword && <span className="error">{errors.rePassword.message}</span>}



                                    <input type="submit" value="Create an account" />
                                </form>

                                <span className="toogle" onClick={() => setNewUser(!newUser)}>Already have an account?Login</span> 
                                </div> 

                                :   <div className="login-form">
                                        <h3>Login</h3>
                                        <form onSubmit={handleSubmit(onSubmit)}>


                                            <input type="email" name="email" ref={register({ 
                                                required: "Email field is required",
                                                pattern: {
                                                    value: /\S+@\S+\.\S+/,
                                                    message: "Please provide valid email address"
                                                }
                                            })} placeholder="Your email"/>
                                            {errors.email && <span className="error">{errors.email.message}</span>}

                                            <input type="password" name="password" ref={register({
                                                required: "Password field is required",
                                                minLength: {
                                                    value: 6,
                                                    message: "Password containing at least 8 characters"
                                                },
                                                pattern: {
                                                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                                                    message: "Password containing characters, number, upper and lowercase"
                                                }
                                                })} placeholder="Your password"/>
                                            {errors.password && <span className="error">{errors.password.message}</span>}

                                            <div className="inine-input">
                                                <label htmlFor="checkbox"><input type="checkbox" name="checkbox" id="checkbox"/> Remember me</label>
                                                <Link className="forgot-pass" to="/login">Forgot password</Link>
                                                
                                            </div>

                                            <input type="submit" value="Log in"/>
                                        </form>

                                        <span className="toogle" onClick={() => setNewUser(!newUser)}>Don't have an account? Create an account</span> 
                                    </div>
                            }




                            
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <div className="alternate-login-system">

                                <div className="or-section">
                                    <hr/>Or<hr/>
                                </div>
                                <div onClick={handleFacebookSignIn} className="facebook">
                                    <img className="icon" src={faIcon} alt=""/>
                                    <p>Continue with Facebook</p>
                                </div>
                                <div onClick={handleGoogleSignIn} className="google">
                                    <img className="icon" src={googleIcon} alt=""/>
                                    <p>Continue with Google</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Login;