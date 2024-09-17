import React, { ButtonHTMLAttributes, ElementType } from "react";
import styles from "./IconButton.module.css";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: ElementType;
  danger?: boolean;
}

const IconButton = (props: IconButtonProps) => {
  const { Icon, danger, ...rest } = props;
  return (
    <button
      className={`${styles.button} ${danger ? styles.danger : ""}`}
      {...rest}
    >
      <Icon danger />
    </button>
  );
};

export default IconButton;
