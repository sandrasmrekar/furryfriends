import React, {
  createContext,
  ReactNode,
  FormEventHandler,
  useState,
  useEffect
} from "react";
import { deepEqual } from "../../utils/deepEqual";

type CommonValueObject = Record<string, string | number | null>;

interface FieldUpdate {
  name: string;
  value: string | number | null;
}

interface FormContextType {
  isValid: boolean;
  isDirty: boolean;
  showErrors: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
  setValue: ({ name, value }: FieldUpdate) => void;
  setError: ({ name, value }: FieldUpdate) => void;
}

interface FormProviderProps {
  children: ReactNode;
  initialValues: CommonValueObject;
  onSubmit: (values: CommonValueObject) => void;
}

export const FormContext = createContext<FormContextType | undefined>(
  undefined
);

const FormProvider = (props: FormProviderProps) => {
  const { children, onSubmit, initialValues } = props;
  const [isValid, setIsValid] = useState(true);
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState<CommonValueObject>({});
  const [values, setValues] = useState<CommonValueObject>(initialValues);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isValid ? onSubmit(values) : setShowErrors(true);
  };

  const handleSetValue = ({ name, value }: FieldUpdate) => {
    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSetError = ({ name, value }: FieldUpdate) => {
    setErrors((prev) => {
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    const hasError = Object.values(errors).some((error) => !!error);
    setIsValid(!hasError);
  }, [errors]);

  const isDirty = !deepEqual(initialValues, values);

  return (
    <FormContext.Provider
      value={{
        isDirty,
        isValid,
        showErrors,
        onSubmit: handleSubmit,
        setError: handleSetError,
        setValue: handleSetValue
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
