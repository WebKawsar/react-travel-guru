import * as firebase from "firebase/app";
import "firebase/auth";
import { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import firebaseConfig from "./firebase.config";



export const initializeFirebaseFramework = () => {

  if(firebase.apps.length === 0){

    firebase.initializeApp(firebaseConfig);
  } 
    
}


//handle sign with email and password
export const handleLoginSystem = (email, password) => {

    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(response => {
        
        const signInWithEmailAndPassword = {

            email: email,
            password: password,
            success: true,
            error: ""

        };

        return signInWithEmailAndPassword;


        })
        .catch(error => {

        const signInWithEmailAndPasswordError = {

            success: false,
            error: error.message
        };

        return signInWithEmailAndPasswordError;
            
        });

}


// handle Register system
export const handleRegisterSystem = (data) => {

    return firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    .then(response => {

        const newUserInfo = {

            success: true,
            name: data.firstName + " " + data.lastName,
            password: data.password,
            email: data.email,
            error: ""
        }

        return newUserInfo;
    })
    .catch(error => {

        const message = error.message;
        const newUserInfoError = {

            success: false,
            error: message
        };

        return newUserInfoError;
    });


}



// handle facebook sign in system
export const facebookSignIn = () => {

    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
    .then(response => {

        const {displayName, email, photoURL} = response.user;
        const facebookSignInUser = {

            name: displayName,
            email: email,
            img: photoURL,
            success: true,
            error: "",

        };

        return facebookSignInUser;

      })
      .catch(error => {

        const facebookSignError = {

            success: false,
            error: error.message
        };

        return facebookSignError;
      });

}

// handle google sign in system
export const googleSignIn = () => {

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then(response => {

        const {displayName, email, photoURL} = response.user;
        const googleSignInUser = {

            name: displayName,
            email: email,
            img: photoURL,
            success: true,
            error: ""

        };

        return googleSignInUser;
    
      })
      .catch(error => {

        const googleSignInUserError = {

            success: false,
            error: error.message
        };

        return googleSignInUserError
      });

}
