import Axios from "axios";
import { HOST_NAME } from "../constants";
import { UserService } from "../services/user-service";

export const handleCommonError = error => {
  if (error.response.status === 401) {
    alert("Your session has expire!");
    UserService.removeJwt();
    window.location.reload();
  } else {
    console.log(error)
  }
};

export const Request = () => {
  return Axios.create({
    baseURL: HOST_NAME
  });
};

const getToken = () => {
  let token = localStorage.getItem("token");
  return "Bearer " + token;
};

const getAuthConfig = () => {
  let config = {
    headers: {
      Authorization: getToken()
    }
  };
  return config;
};

export const AuthRequest = {
  post(URL, data) {
    let config = getAuthConfig();
    return Request().post(URL, data, config);
  },
  get(URL) {
    let config = getAuthConfig();
    return Request().get(URL, config);
  },
  put(URL, data) {
    let config = getAuthConfig();
    return Request().put(URL, data, config);
  },
  delete(URL) {
    let config = getAuthConfig();
    return Request().delete(URL, config);
  }
};
