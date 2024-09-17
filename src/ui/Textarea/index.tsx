import React from "react";
import styles from "./Textarea.module.css";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}

const Textarea = (props: TextareaProps) => {
  const { name } = props;
  return (
    <textarea {...props} id={name} name={name} className={styles.textarea} />
  );
};

export default Textarea;
