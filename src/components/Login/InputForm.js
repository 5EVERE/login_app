import styles from "./Login.module.css";
const InputForm = function (props) {
  return (
    <div
      className={`${styles.control} ${
        props.isValid === false ? styles.invalid : ""
      }`}
    >
      <label htmlFor={props.type}>{props.type}</label>
      <input
        type={props.type}
        id={props.type}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
};
export default InputForm;
