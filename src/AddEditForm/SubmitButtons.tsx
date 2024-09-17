import React, { useContext } from "react";
import { FormContext } from "../ui/form/FormProvider";
import styles from "./SubmitButtons.module.css";
import PrimaryButton from "../ui/PrimaryButton";

interface SubmitButtonsProps {
  isEdit: boolean;
  onClose: () => void;
}

const SubmitButtons = ({ onClose, isEdit }: SubmitButtonsProps) => {
  const form = useContext(FormContext);

  return (
    <div className={styles.buttons}>
      <PrimaryButton onClick={onClose}>Close</PrimaryButton>
      {isEdit ? (
        <PrimaryButton disabled={!form?.isDirty} type="submit">
          Save
        </PrimaryButton>
      ) : (
        <PrimaryButton disabled={!form?.isDirty} type="submit">
          Add
        </PrimaryButton>
      )}
    </div>
  );
};

export default SubmitButtons;
