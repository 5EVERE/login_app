import React, { useState, useEffect } from "react";
const AuthComponent = React.createContext({
});

export const AuthComponentProvider = function (props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("loggined") === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    setIsLoggedIn(true);
    localStorage.setItem("loggined", "true");
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("loggined");
  };
  return (
    <AuthComponent.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthComponent.Provider>
  );
};
export default AuthComponent;
