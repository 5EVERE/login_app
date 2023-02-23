import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthComponent from "../../store/auth-component";
import InputForm from "./InputForm";
const emailReducer = function (prevState, action) {
  if (action.type === "EMAIL") {
    return {
      inputEmail: action.inputEmail,
      isValid: action.inputEmail.includes("@"),
    };
  }
  if (action.type === "BLUR") {
    return {
      inputEmail: prevState.inputEmail,
      isValid: prevState.inputEmail.includes("@"),
    };
  }
  return {
    inputEmail: "",
    isValid: false,
  };
};
const passwordReducer = function (prevState, action) {
  if (action.type === "PASS") {
    return {
      inputPass: action.inputPass,
      isValid: action.inputPass.trim().length > 7,
    };
  }
  if (action.type === "BLUR") {
    return {
      inputEmail: prevState.inputPass,
      isValid: prevState.inputPass.trim().length > 7,
    };
  }
  return {
    inputPass: "",
    isValid: false,
  };
};
const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const context = useContext(AuthComponent);
  const [emailState, emailStateReducer] = useReducer(emailReducer, {
    inputEmail: "",
    isValid: undefined,
  });
  const [passwordState, passwordStateReducer] = useReducer(passwordReducer, {
    inputPass: "",
    isValid: undefined,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    emailStateReducer({
      type: "EMAIL",
      inputEmail: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    passwordStateReducer({
      type: "PASS",
      inputPass: event.target.value,
    });
  };
  const validateEmailHandler = () => {
    emailStateReducer({ type: "BLUR" });
  };

  const validatePasswordHandler = () => {
    passwordStateReducer({ type: "BLUR" });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    context.onLogin(emailState.inputEmail, passwordState.inputPass);
  };
  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <InputForm
          type="email"
          value={emailState.inputEmail}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          isValid={emailState.isValid}
        />
        <InputForm
          type="password"
          value={passwordState.inputPass}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          isValid={passwordState.isValid}
        />
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn} disabled={!formIsValid}>
            Вход
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
