import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import './Profile.css'; // Assurez-vous d'ajouter des styles dans ce fichier

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "", email: "", firstName: "", lastName: "", mobileNumber: "", roles: [] }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) {
      this.setState({ redirect: "/home" });
    } else {
      this.setState({ currentUser: currentUser, userReady: true });
    }
  }

  // Fonction pour obtenir le libellé du rôle
  getRoleLabel = (role) => {
    switch (role) {
      case 'ROLE_ADMIN':
        return 'Admin';
      case 'ROLE_USER':
        return 'User';
      default:
        return 'Unknown';
    }
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    const { currentUser, userReady } = this.state;

    return (
      <div className="container profile">
        {userReady ? (
          <div className="profile-content">
            <h3 className="profile-title">Profile</h3>
            <p><strong>Username:</strong> &nbsp; {currentUser.username}</p>
            <p><strong>Email:</strong> &nbsp; {currentUser.email}</p>
            <p><strong>First Name:</strong> &nbsp; {currentUser.firstName}</p>
            <p><strong>Last Name:</strong> &nbsp; {currentUser.lastName}</p>
            <p><strong>Mobile Number:</strong> &nbsp; {currentUser.mobileNumber}</p>
            <div className="role-container">
              <p><strong>Role:</strong></p>
              <ul>
                {currentUser.roles && currentUser.roles.map((role, index) => (
                  <li key={index}>{this.getRoleLabel(role)}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}
