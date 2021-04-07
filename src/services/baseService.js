import axios from "axios";
import { getSessionToken } from "@shopify/app-bridge-utils";
import createApp from "@shopify/app-bridge";

var host = null;
var BaseService = null;
if (typeof window !== "undefined") {
  host = window.location.hostname;
}

var baseUrl = "https://" + host + "/api/";
var tempURL = "http://localhost:8080/api/";
var url = host && host.includes("localhost") ? tempURL : baseUrl;
BaseService = axios.create({
  baseURL: url,
});

// consle.log("process.env.REACT_APP_API_KEY", process.env.NEXT_PUBLIC_API_KEY);
let app_Key = process.env.REACT_APP_API_KEY;

BaseService.interceptors.request.use(function (config) {
  const app = createApp({
    apiKey: app_Key,
    shopOrigin: window.shop,
  });
  return getSessionToken(app) // requires an App Bridge instance
    .then((token) => {
      // append your request headers with an authenticated token
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    });
});


export default BaseService;
