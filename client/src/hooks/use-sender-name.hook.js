import { useEffect, useState } from "react";

export function useUsernameHook() {
  const [sender, setSender] = useState("");

  useEffect(() => {
    let user = prompt("Please enter your name: ");
    setSender(user);
  }, []);

  return { sender };
}
