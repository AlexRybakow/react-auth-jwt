import { api } from './api';
import UserToken from "./tokens";

class AuthUser {
    async login(username, password) {
      return api.post("/login", {
                username,
                password
            })
            .then(res => {
                if (res.data.accessToken) {
                    UserToken.setUser(res.data);
                }
                return res.data;
            })
        
    }
    signUp(username, email, password) {
        return api.post("/signup", {
            username,
            email,
            password
        })
    }
    getUser() {
        return UserToken.getUser();
    }
}


export default new AuthUser();