import React, { useContext, useEffect, useState } from "react";
import styles from "./FormField.module.css";
import { FormContext } from "../FormProvider";

interface BaseProps {
  label: string;
  validate?: (value: string) => string | boolean;
  as: React.ComponentType<any>;
  name: string;
}

type FormFieldProps<T> = BaseProps & T;

const FormField = <T extends object>(props: FormFieldProps<T>) => {
  const {
    label,
    name,
    value,
    onChange,
    validate,
    as: Component,
    ...rest
  } = props as any;

  const [error, setError] = useState<boolean | string>(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const form = useContext(FormContext);

  const handleValidation = (value: string) => {
    if (validate) {
      const error = validate(value);
      setError(error);
      form?.setError({ name, value: error });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleValidation(e.target.value);

    form?.setValue({ name, value: e.target.value });
    onChange(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsBlurred(true);
    handleValidation(e.target.value);
  };

  useEffect(() => {
    handleValidation(value);
  }, []);

  const showErrors = isBlurred || form?.showErrors;

  return (
    <div className={styles.wrapper}>
      <div className={styles.labelGroup}>
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
        {error && showErrors && <span className={styles.error}>{error}</span>}
      </div>
      <Component
        name={name}
        value={value}
        onBlur={handleBlur}
        onChange={handleChange}
        {...rest}
      />
    </div>
  );
};

export default FormField;
