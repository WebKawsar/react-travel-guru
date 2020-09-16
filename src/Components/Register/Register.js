import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import googleIcon from "../../travel-guru-resources/Icon/google.png";
import faIcon from "../../travel-guru-resources/Icon/fb.png";
import "./Register.css";


import * as firebase from "firebase/app";
import "firebase/auth";
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';





const Register = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {

        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then(response => {

            const newUserInfo = {
                name: data.name,
                email: data.email,
                password: data.password,
                success: true,
                error: false
            }
            
            setLoggedInUser(newUserInfo);
        })
        .catch(error => {

            const newUserInfo = {
                success: false,
                error: error.message
            }
            
            setLoggedInUser(newUserInfo);
          });

    }



    // Handle Facebook Sign In
    const handleFacebookSignIn = () => {

        const fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(fbProvider)
        .then(response => {
           
            const {displayName, email, photoURL} = response.user;
            const facebookSignInUser = {

                name: displayName,
                email: email,
                img: photoURL,
                success: true,
                error: ""

            }
            setLoggedInUser(facebookSignInUser);

          })
          .catch(error => {

            const errorMessage = error.message;
            const facebookSignError = {

                success: false,
                error: errorMessage

            }
            setLoggedInUser(facebookSignError);
            
          });

    }



    // Handle Google Sign In
    const handleGoogleSignIn = () => {

        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider)
        .then(response => {
           
            const {displayName, email, photoURL} = response.user;
            const googleSignInUser = {

                name: displayName,
                email: email,
                img: photoURL,
                success: true,
                error: ""

            }
            setLoggedInUser(googleSignInUser);

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

    const handleInputFocus = () => {
        document.getElementById("firstName").style.borderStyle = "none";
        document.getElementById("firstName").style.borderBottom = "2px solid lightgray";
    }


    return (
        <Container>
            <div className="register-section">
                <Header></Header>
                <div className="register-system">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            {
                                loggedInUser.success && <p style={{color: "green", textAlign: "center", fontSize: "20px"}}>You have successfully Sign in</p>
                            }
                            {
                                loggedInUser.error && <p style={{color: "red", textAlign: "center", fontSize: "20px"}}>{loggedInUser.error}</p>
                            }
                            <div className="register-form">
                                <h3>Create an account</h3>
                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <input type="text" id="firstName" onFocus={handleInputFocus} name="firstName" ref={register({ required: "First name is required"})} placeholder="First name"/>
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

                                <span>Already have an account? <Link to="/login">Login</Link></span> 
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <div className="alternate-register-system">

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

export default Register;