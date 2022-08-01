import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
export const useUser = () => {
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
