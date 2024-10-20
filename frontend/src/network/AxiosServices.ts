// FIx this according to our configuration
import axios from "axios";
import globalRouter from "./GlobalRouter";
import {
  clearTokens,
  getAccessToken,
  loginRefreshFormDataCreation,
  storeTokens,
} from "../network/Utils";
import { ApiServices } from "../network/ApiServices";

// creating new axios instance
const axiosInstance = axios;

// keeping a queue of request that failed with 401
let isRefreshing = false;
let failedQueue: any = [];

// processing the failed queue
const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// WE WILL NEED THIS INTERCEPTOR LATER
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const prevRequest = error.config;
//     if (401 === error.response.status && !prevRequest.sent) {
//       // executing all the failed queue calls with new token
//       if (isRefreshing) {
//         return new Promise(function (resolve, reject) {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             prevRequest.headers["Authorization"] = "Bearer " + token;
//             return axios(prevRequest);
//           })
//           .catch((err) => {
//             return Promise.reject(err);
//           });
//       }
//       prevRequest.sent = true;
//       isRefreshing = true;

//       // refresh token details
//       let serverUrl = `${process.env.REACT_APP_API_URL}`;
//       const auth: string = btoa(
//         `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
//       );

//       const requestHeader = {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Basic ${auth}`,
//       };

//       // refresh token formdata
//       let refreshFormData = loginRefreshFormDataCreation(true);

//       return new Promise(function (resolve, reject) {
//         axiosInstance
//           .post(serverUrl + ApiServices.LOGIN, refreshFormData, {
//             headers: requestHeader,
//           })
//           .then(({ data }) => {
//             // storing new token in local storage,
//             // adding the new token to the headers
//             // of previous calls and axios instance.
//             storeTokens(data);
//             axiosInstance.defaults.headers.common["Authorization"] =
//               "Bearer " + data.value;
//             prevRequest.headers["Authorization"] = "Bearer " + data.value;
//             processQueue(null, data.value);
//             resolve(axiosInstance(prevRequest));
//           })
//           .catch((error) => {
//             // clear token and navigate to login
//             // if refresh token api fails
//             processQueue(error, null);
//             clearTokens();
//             reject(error);
//             if (globalRouter.navigate) {
//               globalRouter.navigate("/login");
//             }
//           })
//           .finally(() => {
//             isRefreshing = false;
//           });
//       });
//     } else {
//       return Promise.reject(error);
//     }
//   }
// );

function getIRequestProp(isMultipartData: boolean) {
  let accessToken = getAccessToken();
  let serverUrl = `${process.env.REACT_APP_API_URL}`;

  if (accessToken) {
    let authToken = `Bearer ${accessToken}`;
    return {
      serverUrl: serverUrl,
      requestHeader: {
        "Content-Type": isMultipartData
          ? "multipart/form-data"
          : "application/json",
        Authorization: authToken,
      },
    };
  }

  return {
    serverUrl: serverUrl,
    requestHeader: {
      "Content-Type": isMultipartData
        ? "multipart/form-data"
        : "application/json",
    },
  };
}

async function get(url: string, parameter: any) {
  let isMultipartData: boolean = false;
  let { serverUrl, requestHeader } = getIRequestProp(isMultipartData);
  return await axiosInstance.get(serverUrl + url, {
    params: parameter,
    headers: requestHeader,
  });
}

async function post(url: string, body: any) {
  let isMultipartData: boolean = false;
  let { serverUrl, requestHeader } = getIRequestProp(isMultipartData);
  return await axiosInstance.post(serverUrl + url, body, {
    headers: requestHeader,
  });
}

async function postMultipartData(url: string, body: any) {
  let isMultipartData: boolean = true;
  let { serverUrl, requestHeader } = getIRequestProp(isMultipartData);
  return await axiosInstance.post(serverUrl + url, body, {
    headers: requestHeader,
  });
}

async function logoutPostMultipart(url: string) {
  let serverUrl = `${process.env.REACT_APP_API_URL}`;
  const accessToken: string = getAccessToken();
  const auth: string = btoa(
    `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
  );
  const requestHeader = {
    "Content-Type": "multipart/form-data",
    Authorization: `Basic ${auth}`,
  };
  return await axiosInstance.post(
    `${serverUrl}${url}/${accessToken}`,
    {},
    {
      headers: requestHeader,
    }
  );
}

async function putMultipartData(url: string, body: any) {
  let isMultipartData: boolean = true;
  let { serverUrl, requestHeader } = getIRequestProp(isMultipartData);
  return await axiosInstance.put(serverUrl + url, body, {
    headers: requestHeader,
  });
}

async function put(url: string, body: any) {
  let isMultipartData: boolean = false;
  let { serverUrl, requestHeader } = getIRequestProp(isMultipartData);
  return await axiosInstance.put(serverUrl + url, body, {
    headers: requestHeader,
  });
}

async function patch(url: string, body: any) {
  let isMultipartData: boolean = false;
  let { serverUrl, requestHeader } = getIRequestProp(isMultipartData);
  return await axiosInstance.patch(serverUrl + url, body, {
    headers: requestHeader,
  });
}

async function remove(url: string, body: any) {
  let isMultipartData: boolean = false;
  let { serverUrl, requestHeader } = getIRequestProp(isMultipartData);
  return await axiosInstance.delete(serverUrl + url, {
    // data: body,
    headers: requestHeader,
  });
}

export const AxiosServices = {
  get,
  post,
  put,
  patch,
  remove,
  postMultipartData,
  putMultipartData,
  logoutPostMultipart,
};
