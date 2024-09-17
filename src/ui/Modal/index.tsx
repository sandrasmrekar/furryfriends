import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";

function Portal({ children }: { children: React.ReactNode }) {
  return createPortal(children, document.body);
}

function Modal({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.classList.add("modal-open");

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  return (
    <Portal>
      <div className={styles.overlay} />
      <div className={styles.container}>{children}</div>
    </Portal>
  );
}

export default Modal;
