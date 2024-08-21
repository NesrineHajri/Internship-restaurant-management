import React, { Component } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Auth/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";
import EventBus from "./common/EventBus";
import Reservation from "./components/Reservation/reservation";
import AddReservation from "./components/Reservation/AddReservation";
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
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <span className="navbar-brand">
            Reservation Restaurant
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
        <Link to={"/user"} className="nav-link">
          Make reservation
        </Link>
      </li>
      <li className="nav-item">
        <Link to={"/AddReservation"} className="nav-link">
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
