import React, { useContext } from 'react';
import "./Header.css";
import logo from "../../travel-guru-resources/Logo.png";
import { UserContext } from '../../App';
import { Link, useHistory, useLocation } from 'react-router-dom';


import * as firebase from "firebase/app";
import "firebase/auth";


const Header = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);


    let history = useHistory();
    let location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };


    const handleLogOut = () => {

        firebase.auth().signOut()
        .then(() => {

            setLoggedInUser({});
            history.replace(from)
          })
          .catch(error => {

            console.log(error);
          });

    }

    return (
        <div className="header-section">
            <div className="row header">
                <div className="col-md-6">
                    <div className="logo-section">
                        <Link to="/home"><img src={logo} alt=""/></Link>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="main-menu">
                        <ul className="navigation">
                            
                            <li><Link to="/home">News</Link></li>
                            <li><Link to="/home">Destination</Link></li>
                            <li><Link to="/home">Blog</Link></li>
                            <li><Link to="/home">Contact</Link></li>
                            
                            {
                                loggedInUser.response ? <li><Link onClick={handleLogOut}  className="login" to="/logout">Logout</Link></li> : <li><Link className="login" to="/login">Login</Link></li>
                            }
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;