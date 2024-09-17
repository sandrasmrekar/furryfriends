import React from "react";
import styles from "./PrimaryButton.module.css";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  danger?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  type = "button",
  children,
  danger,
  ...rest
}) => {
  if (danger) {
    return (
      <button className={styles.buttonDanger} type={type} {...rest}>
        {children}
      </button>
    );
  }

  return (
    <button className={styles.button} type={type} {...rest}>
      {children}
    </button>
  );
};
export default PrimaryButton;
