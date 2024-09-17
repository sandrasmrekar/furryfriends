import React, { useState } from "react";
import { Cat } from "../types/Cat";
import styles from "./CatList.module.css";
import AddEditForm from "../AddEditForm";
import CatCard from "./CatCard";
import { useStorageContext } from "../storage/StorageContext";

const CatList = () => {
  const { storedCats, removeCat, getCat } = useStorageContext();

  const [editCat, setEditCat] = useState<Cat>();

  const [showModal, setShowModal] = useState(false);

  const handleEditClick = (id: number) => {
    setEditCat(getCat(id));
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className={styles.cats}>
        {storedCats.map((cat) => {
          return (
            <CatCard
              cat={cat}
              key={cat.id}
              onEdit={handleEditClick}
              onRemove={removeCat}
            />
          );
        })}
      </div>
      {showModal && (
        <AddEditForm
          onClose={handleCloseModal}
          initialValues={editCat}
          isEdit
        />
      )}
    </div>
  );
};

export default CatList;
