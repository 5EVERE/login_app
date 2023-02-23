import React, { useContext } from "react";
import AuthComponent from "../../store/auth-component";
import styles from "./Navigation.module.css";

const Navigation = (props) => {
  const context = useContext(AuthComponent);
  return (
    <nav className={styles.nav}>
      <ul>
        {context.isLoggedIn && (
          <li>
            <a href="/">Пользователи</a>
          </li>
        )}
        {context.isLoggedIn && (
          <li>
            <a href="/">Админ</a>
          </li>
        )}
        {context.isLoggedIn && (
          <li>
            <button onClick={context.onLogout}>Выйти</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
