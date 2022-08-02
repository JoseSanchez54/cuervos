import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export const useUser = async () => {
  const username = useSelector((state) => state.userReducer.username);
  const dispatch = useDispatch();
  const name = "session";
  const [logueado, setLogueado] = useState(false);
  useEffect(() => {
    const token = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    if (token) {
      setLogueado(true);
      dispatch({
        type: "@Add",
        token: token[2],
        login: token[2] ? true : false,
      });
    }
  }, []);

  return logueado;
};
