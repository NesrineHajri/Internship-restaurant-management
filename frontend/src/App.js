import React, { Component } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import "./App.css";
import logo from './assets/images/logo.png';
import AuthService from "./services/auth.service";

import Login from "./components/Auth/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";
import EventBus from "./common/EventBus";
import Reservation from "./components/Reservation/reservation";
import AddReservation from "./components/Reservation/AddReservation";
import { FaPhoneAlt, FaEnvelope, FaGraduationCap, FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaLinkedinIn  } from 'react-icons/fa';
// Import Icons
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';

// Import Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      showUserBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showUserBoard: user.roles.includes("ROLE_USER"),
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showAdminBoard: false,
      showUserBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showAdminBoard, showUserBoard } = this.state;

    return (
      <div>
        <header className="header text-center" style={{ background: 'rgb(255, 0, 0)' }}>
        <div className="d-flex justify-content-center align-items-center">
        <div className="me-4">
          <a href="tel:+21670250000" className="d-flex align-items-center text-white text-decoration-none">
            <FaPhoneAlt className="me-2" />
            <span>(+216) 70 250 000</span>
          </a>
        </div>
          <div className="me-4">
          <a href="mailto:contact@esprit.tn" className="d-flex align-items-center text-white text-decoration-none">
            <FaEnvelope className="me-2" />
            <span>contact@esprit.tn</span>
          </a>
        </div>
          <div className="me-4">
          <a href="https://en.esprit.tn/admission/esprit-ingenieur" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center text-white text-decoration-none">
            <FaGraduationCap className="me-2" />
            <span>Admission</span>
          </a>
        </div>
          <div>
            <a href="https://www.facebook.com/esprit.tn/?fref=ts" target="_blank" rel="noopener noreferrer" className="me-2">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/esprit_ingenieur/" target="_blank" rel="noopener noreferrer" className="me-2">
              <FaInstagram />
            </a>
            <a href="https://x.com/Esprit_News?lang=fr" target="_blank" rel="noopener noreferrer" className="me-2">
              <FaTwitter />
            </a>
            <a href="https://www.youtube.com/@esprit-ecolesuppriveedinge5115/videos" target="_blank" rel="noopener noreferrer" className="me-2">
              <FaYoutube />
            </a>
            <a href="https://www.linkedin.com/school/esprit_2/" target="_blank" rel="noopener noreferrer" className="me-2">
              <FaLinkedinIn />
            </a>
          </div>
          </div>
        
        </header>
        <nav className="navbar">
        <span className="navbar-brand">
           <img src={logo} alt="Reservation Restaurant" />
        </span>
          <div className="navbar-nav mr-auto">
  {showAdminBoard && (
    <li className="nav-item">
      <Link to={"/admin"} className="nav-link">
        Admin Board
      </Link>
    </li>
  )}

  {showUserBoard && (
    <>
      <li className="nav-item">
        <Link to={"/AddReservation"} className="nav-link">
          Make reservation
        </Link>
      </li>
      <li className="nav-item">
        <Link to={"/user"} className="nav-link">
          My reservation
        </Link>
      </li>
    </>
  )}
</div>


{currentUser ? (
  <div className="navbar-nav ml-auto">
    <li className="nav-item">
      <Link to="/profile" className="nav-link">
        Profile
      </Link>
    </li>

    <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : null}
      

   
        </nav>

        <div className="container mt-3">
          <Routes>
            {/* Redirect root path to login */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/reserve" element={<Reservation />} />
            <Route path="/addReservation" element={<AddReservation />} />
          </Routes>
        </div>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;
