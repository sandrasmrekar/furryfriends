import React, { ReactNode, useContext } from "react";
import { FormContext } from "./FormProvider";

interface FormProps {
  children: ReactNode;
}

const Form = ({ children }: FormProps) => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("Form must be used within a FormProvider");
  }

  const { onSubmit } = context;

  return <form onSubmit={onSubmit}>{children}</form>;
};

export default Form;
