import React from "react";
import styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string | number;
  type?: "text" | "number" | "email" | "password" | "file";
}

const Input = ({ type = "text", name, value, ...rest }: InputProps) => {
  return (
    <div className={styles.wrapper}>
      <input
        {...rest}
        id={name}
        name={name}
        type={type}
        value={value || ""}
        className={styles.input}
      />
    </div>
  );
};

export default Input;
