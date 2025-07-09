import { createContext, useCallback, useContext, useState } from "react";
import Cookies from "universal-cookie";

const userContext = createContext();

export default function UserProvider({ children }) {
  const cookies = new Cookies();

  const [user, setUser] = useState(cookies.get("userInfo"));
  const setUserInfo = useCallback(
    (userInfo) => {
      cookies.set("userInfo", userInfo);
      setUser(userInfo);
    },
    [cookies]
  );
  const clearUser = useCallback(() => {
    cookies.remove("userInfo", { path: "/" });
    setUser(null);
  }, [cookies]);

  return (
    <userContext.Provider value={{ user, setUserInfo, clearUser }}>
      {children}
    </userContext.Provider>
  );
}

export const useUserContext = () => useContext(userContext);
