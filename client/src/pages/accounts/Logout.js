import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { removeCookieToken, removeUserData } from "utils/storage/Cookie";
import { DELETE_TOKEN } from "utils/store/Auth";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(DELETE_TOKEN());
    removeCookieToken();
    removeUserData();
    navigate("/");
  }, []);
  return <></>;
}
