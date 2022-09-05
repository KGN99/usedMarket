import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setRefreshToken = (refreshToken, pk, email) => {
  // 유효기간 설정
  const today = new Date();
  const expireDate = today.setDate(today.getHours() + 1);
  return cookies.set("refresh_token", refreshToken, {
    sameSite: "strict",
    path: "/",
    expires: new Date(expireDate),
  });
};

export const setUserData = (pk) => {
  // 유효기간 설정
  const today = new Date();
  const expireDate = today.setDate(today.getHours() + 1);
  return cookies.set("loged_user_pk", pk, { expires: new Date(expireDate) });
};

export const getCookieToken = () => {
  return cookies.get("refresh_token");
};

export const removeCookieToken = () => {
  return cookies.remove("refresh_token", { sameSite: "strict", path: "/" });
};

export const getUserData = () => {
  return cookies.get("loged_user_pk");
};

export const removeUserData = () => {
  return cookies.remove("loged_user_pk");
};
