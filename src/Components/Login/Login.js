import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import Header from '../Header/Header';
import "./Login.css";
import googleIcon from "../../travel-guru-resources/Icon/google.png";
import faIcon from "../../travel-guru-resources/Icon/fb.png";

import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../Firebase/firebase.config';
import { UserContext } from '../../App';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';




firebase.initializeApp(firebaseConfig);

const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    let history = useHistory();
    let location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };


    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {

        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then(response => {
           
            const signInWithEmailAndPass = {...loggedInUser};
            
            signInWithEmailAndPass.email = data.email;
            signInWithEmailAndPass.password = data.password;
            signInWithEmailAndPass.success = true;
            signInWithEmailAndPass.error = "";

            setLoggedInUser(signInWithEmailAndPass);
            history.replace(from);

          })
          .catch(error => {

            const errorMessage = error.message;
            const signInError = {

                success: false,
                error: errorMessage

            }
            setLoggedInUser(signInError);
            
          });

    }




    const handleFacebookSignIn = () => {

        const fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(fbProvider)
        .then(response => {

            const {displayName, email, photoURL} = response.user;
            const facebookSignInUser = {...loggedInUser};

            facebookSignInUser.name = displayName;
            facebookSignInUser.email = email;
            facebookSignInUser.img = photoURL;
            facebookSignInUser.success = true;
            facebookSignInUser.error = "";

            setLoggedInUser(facebookSignInUser);
            history.replace(from);

          })
          .catch(error => {

            const errorMessage = error.message;
            const facebookSignError = {

                success: false,
                error: errorMessage

            }
            setLoggedInUser(facebookSignError);
            history.replace(from);
          });

    }





    const handleGoogleSignIn = () => {

        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider)
        .then(response => {
           
            const {displayName, email, photoURL} = response.user;
            const googleSignInUser = {...loggedInUser};

            googleSignInUser.name = displayName;
            googleSignInUser.email = email;
            googleSignInUser.img = photoURL;
            googleSignInUser.success = true;
            googleSignInUser.error = "";

            setLoggedInUser(googleSignInUser);
            history.replace(from);
            
          })
          .catch(error => {

            const errorMessage = error.message;
            const googleSignError = {

                success: false,
                error: errorMessage

            }
            setLoggedInUser(googleSignError);
            
          });

    }




    return (
        <Container>
            <div className="login-section">
                <Header></Header>
                <div className="login-system">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            {
                                loggedInUser.success && <p style={{color: "green", textAlign: "center", fontSize: "20px"}}>You have successfully Sign in</p>
                            }
                            {
                                loggedInUser.error && <p style={{color: "red", textAlign: "center", fontSize: "20px"}}>{loggedInUser.error}</p>
                            }
                            <div className="login-form">
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

                                    
                                    {/* <input type="email" name="email" id="email" placeholder="Username or Email"/> */}

                                    {/* <input type="password" name="password" id="password" placeholder="Password"/> */}

                                    <div className="inine-input">
                                        <label htmlFor="checkbox"><input type="checkbox" name="checkbox" id="checkbox"/> Remember me</label>
                                        <Link className="forgot-pass" to="/login">Forgot password</Link>
                                        
                                    </div>

                                    <input type="submit" value="Log in"/>
                                </form>

                                <span>Don't have an account? <Link to="/register">Create an account</Link></span> 
                            </div>
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