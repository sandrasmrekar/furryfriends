import React, { useState } from "react";
import AddEditForm from "./AddEditForm";
import CatList from "./CatList";
import styles from "./App.module.css";
import PrimaryButton from "./ui/PrimaryButton";

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Furry friends</h1>
        <PrimaryButton onClick={() => setShowModal((prev) => !prev)}>
          Add friend
        </PrimaryButton>
      </div>

      <CatList />
      {showModal && <AddEditForm onClose={handleCloseModal} />}
    </div>
  );
}

export default App;
