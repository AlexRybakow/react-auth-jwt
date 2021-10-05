class UserToken {
    getRefreshedToken() {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.refreshToken;
    }
  
    getAccessToken() {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.accessToken;
    }
  
    updateAccessToken(token) {
      let user = JSON.parse(localStorage.getItem("user"));
      user.accessToken = token;
      localStorage.setItem("user", JSON.stringify(user));
    }
  
    getUser() {
      return JSON.parse(localStorage.getItem("user"));
    }
  
    setUser(user) {
      console.log(JSON.stringify(user));
      localStorage.setItem("user", JSON.stringify(user));
    }
  
    deleteUser() {
      localStorage.removeItem("user");
    }
  }
  
  export default new UserToken();
  