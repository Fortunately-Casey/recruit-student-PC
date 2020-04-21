import axios from "axios";
import { getURL } from "@/common/tool/tool";

let http = {};
http.post = function(apiUrl, params) {
  let token = window.localStorage.getItem("token");
  const url = getURL(apiUrl);
  return axios
    .post(url, params, {
      headers: {
        token: token
      }
    })
    .then(resp => {
      return Promise.resolve(resp);
    })
    .catch(err => {
      console.log(err);
    });
};

http.get = function(apiUrl, params) {
  let token = window.localStorage.getItem("token");
  const url = getURL(apiUrl);
  return axios
    .get(url, {
      params: params,
      headers: {
        token: token
      }
    })
    .then(resp => {
      return Promise.resolve(resp);
    })
    .catch(err => {
      console.log(err);
    });
};

export default http;
