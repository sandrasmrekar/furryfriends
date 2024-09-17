import React from "react";
import styles from "./Select.module.css";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  value: string;
  name: string;
  options: SelectOption[];
}

const Select = ({ name, options, ...rest }: SelectProps) => {
  return (
    <div className={styles.wrapper}>
      <select {...rest} className={styles.select} id={name} name={name}>
        {options?.map(({ value, label }, i) => (
          <option key={i} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
