import React, { useContext } from 'react';
import "./Header.css";
import logo from "../../travel-guru-resources/Logo.png";
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';


const Header = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <div className="header-section">
            <div className="row header">
                <div className="col-md-6">
                    <div className="logo-section">
                        <a href="/home"><img src={logo} alt=""/></a>
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
                                loggedInUser.success ? <li><Link className="login" to="/logout">Logout</Link></li> : <li><Link className="login" to="/login">Login</Link></li>
                            }
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;