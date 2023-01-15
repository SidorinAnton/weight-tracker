import { baseApi } from "./config";

export const ApiIsAuthenticated = async () => {
  const resp = await baseApi("/is_authenticated/");

  if (!resp) {
    throw Error("No response from 'is_authenticated'");
  }
  return resp.status === 204;
};

export const ApiLogin = async (data: {
  username: string;
  password: string;
}) => {
  const resp = await baseApi("/login/", "POST", data);
  if (!resp) {
    throw Error("No response from 'login'");
  }

  if (resp.status !== 204) {
    return await resp.json();
  }

  return null;
};

export const ApiLogout = async () => {
  const resp = await baseApi("/logout/");
  if (!resp) {
    throw Error("No response from 'logout'");
  }

  if (resp.status !== 204) {
    return await resp.json();
  }

  return null;
};
