import { useEffect } from "react";
import { useState } from "react";

function useAuth({ socket }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (!socket) return;
    socket.on("otpSuccess", ({ token, userId }) => {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      setToken(token);
    });
  }, [socket]);

  return { isLoggedIn: !!token };
}

export default useAuth;
