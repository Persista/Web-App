import axios from 'axios';
import { getLS, removeLS } from '../localStorage';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAccessToken = () => getLS('token');


const getHeaders = (token?: string | null, params?: any) => {
  if (!token) token = getAccessToken();
  if (token) {
    return {
      headers: {
        Accept: 'application/json',
        Authorization: "Bearer " + token,
      },
      params: params,
    };
  }
  return {
    headers: {
      Accept: 'application/json',
    },
    params: params,
  };
};

const get = async (endpoint: string, token: string | null = null, params: any | null = null) => {
  try {
    let res = await axios.get(API_URL + endpoint, getHeaders(token, params));
    return res;
  } catch (err: any) {
    if (err.response.status === 401) {
      removeLS("token");
    }
    return err.response;
  }
};

const post = async (endpoint: string, body: object, token: string | null = null, form: boolean = false) => {
  let options: any = getHeaders(token);
  if (form) {
    options.headers['Content-Type'] = 'multipart/form-data';
  }
  try {
    return await axios.post(API_URL + endpoint, body, options);
  } catch (err: any) {
    if (err.response.status === 401) {
      removeLS("token");
    }
    return err.response;
  }
};

const update = async (endpoint: string, body: object, token: string | null = null) => {
  try {
    return await axios.patch(API_URL + endpoint, body, getHeaders(token));
  } catch (err: any) {
    if (err.response.status === 401) {
      removeLS("token");
    }
    return err.response;
  }
};

const remove = async (endpoint: string, token: string | null = null) => {
  try {
    return await axios.delete(API_URL + endpoint, getHeaders(token));
  } catch (err: any) {
    if (err.response.status === 401) {
      removeLS("token");
    }
    return err.response;
  }
};

const logout = () => {
  removeLS('jwt_token');
};

export {
  getAccessToken,
  post,
  get,
  update,
  remove,
  API_URL,
  getHeaders,
  logout,
};
