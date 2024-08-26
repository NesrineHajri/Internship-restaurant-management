import axios from "axios";

const API_URL = "http://localhost:8091/api/auth/";

class AuthService {
  // Login method
  login(username, password) {
    return axios
      .post(API_URL + "signin", { username, password })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch(error => {
        console.error("Login failed:", error);
        throw error; // Re-throw error to be handled by caller
      });
  }

  // Logout method
  logout() {
    localStorage.removeItem("user");
  }

  // Register method
  register(username, email, password, confirmPassword, firstName = '', lastName = '', mobileNumber = '') {
    // Client-side password validation
    if (password !== confirmPassword) {
      return Promise.reject(new Error("Passwords do not match!"));
    }

    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      mobileNumber
    })
    .catch(error => {
      console.error("Registration failed:", error);
      throw error; // Re-throw error to be handled by caller
    });
  }

  // Get current user from local storage
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
