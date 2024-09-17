import React from "react";
import { Cat } from "../types/Cat";
import styles from "./CatList.module.css";
import PrimaryButton from "../ui/PrimaryButton";

interface CatCardProps {
  cat: Cat;
  onRemove: (id: number) => void;
  onEdit: (id: number) => void;
}

const CatCard = ({ cat, onRemove, onEdit }: CatCardProps) => {
  const handleRemoveCat = () => {
    onRemove(cat.id);
  };

  const handleEditCat = () => {
    onEdit(cat.id);
  };

  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src={cat.image || ""}
        alt="Profile Picture"
      />
      <div className={styles.content}>
        <h2 className={styles.name}>{cat.name}</h2>
        <p className={styles.info}>
          <span className={styles.gender}>Gender: {cat.gender}</span>
          <span className={styles.age}>Born: {cat.birthDate}</span>
        </p>
        <p className={styles.bio}>{cat.bio}</p>
        <div className={styles.buttons}>
          <PrimaryButton onClick={handleEditCat}>Edit</PrimaryButton>
          <PrimaryButton onClick={handleRemoveCat} danger>
            Remove
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default CatCard;
