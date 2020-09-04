import { API } from "../config";
import cookie from "js-cookie";

//Pre singup method
export const preSignup = (user) => {
  //
  return fetch(`${API}/pre-signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Sigup user Method
export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Signin user Method
export const signin = (user) => {
  //
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//sigout user Method
export const signout = (next) => {
  //remove cookie with the key token
  rmeoveCookie("token");
  //remove the user from the localStorage
  removeLocalStorage("user");
  next();

  //send request to the backend
  return fetch(`${API}/signout`, {
    method: "GET",
  })
    .then((response) => console.log("Signed out successfully"))
    .catch((err) => console.log(err));
};

//Forgot Password Method
export const forgotPassword = (email) => {
  return fetch(`${API}/forgot-password`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Reset Password Method
export const resetPassword = (resetInfo) => {
  return fetch(`${API}/reset-password`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resetInfo),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//SOCIAL LOGINS -----------------------------------------------------------

//Login with Google
export const loginWithGoogle = (user) => {
  return fetch(`${API}/google-login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Login with Facebook
export const loginWithFacebook = (userInfo) => {
  console.log("USER INFO", userInfo);

  return fetch(`${API}/facebook-login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//AUTH HELPERS ------------------------------------------------------------

//set cookei
export const setCookie = (key, value) => {
  //if on the client side
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

//remove cookei
export const rmeoveCookie = (key, value) => {
  //if on the client side
  if (process.browser) {
    cookie.remove(key, value, {
      expires: 1,
    });
  }
};

//get cookie -- make sure you return the cookie
export const getCookie = (key) => {
  //if on the client side
  if (process.browser) {
    return cookie.get(key);
  }
};

//localStorage
export const setLocalStorage = (key, value) => {
  //if on the client side
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  //if on the client side
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

//AUTH MIDDLEWARES ---------------------------------------------------------

//authenticate the user by passing data to cookie and localStorage
//this is a middleware
export const authenticate = (data, next) => {
  //this is how we send the token from our backend
  setCookie("token", data.token);
  setLocalStorage("user", data.user);
  next();
};

//get user info from the localStorage
export const isAuth = () => {
  if (process.browser) {
    //see if the user logged in
    const cookieChecked = getCookie("token");

    //if we have a valid cookie
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

//updating user in the localStorage
export const updateUser = (user, next) => {
  if (process.browser) {
    if (localStorage.getItem("user")) {
      //all the info is in the auth not
      let auth = JSON.parse(localStorage.getItem("user"));

      //now update the auth variable with the new updated info
      auth = user;

      //save the updated info with the user key
      localStorage.setItem("user", JSON.stringify(auth));
      next();
    }
  }
};
