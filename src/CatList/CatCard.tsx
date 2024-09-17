import React from "react";
import { Cat } from "../types/Cat";
import styles from "./CatList.module.css";
import IconButton from "../ui/IconButton";
import TrashIcon from "../ui/IconButton/icons/TrashIcon";
import EditIcon from "../ui/IconButton/icons/EditIcon";

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
      <img className={styles.image} src={cat.image || ""} alt="image" />
      <div className={styles.content}>
        <h2 className={styles.name}>{cat.name}</h2>
        <p className={styles.info}>
          <span className={styles.gender}>Gender: {cat.gender}</span>
          <span className={styles.age}>Born: {cat.birthDate}</span>
        </p>
        {cat.bio ? (
          <p className={styles.bio}>{cat.bio}</p>
        ) : (
          <p className={styles.noBio}>No bio available</p>
        )}
        <div className={styles.buttons}>
          <IconButton onClick={handleRemoveCat} Icon={TrashIcon} danger />
          <IconButton onClick={handleEditCat} Icon={EditIcon} />
        </div>
      </div>
    </div>
  );
};

export default CatCard;
