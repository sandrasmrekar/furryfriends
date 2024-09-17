import React from "react";
import styles from "./ImageInput.module.css";

interface ImageInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
}

const convertFileToDataURL = (
  file: File,
  callback: (dataUrl: string) => void
) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result as string);
  };
  reader.readAsDataURL(file);
};

const ImageInput = (props: ImageInputProps) => {
  const { onChange, name, value, ...rest } = props;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      convertFileToDataURL(file, (dataUrl) => {
        onChange({ target: { name, value: dataUrl } });
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const handleFileDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      convertFileToDataURL(file, (dataUrl) => {
        onChange({ target: { name, value: dataUrl } });
      });
    }
  };

  return (
    <div className={styles.container}>
      <label
        htmlFor={name}
        onDrop={handleFileDrop}
        className={styles.label}
        onDragOver={handleDragOver}
      >
        <input
          hidden
          {...rest}
          type="file"
          id={name}
          name={name}
          accept="image/*"
          className={styles.input}
          onChange={handleImageChange}
        />
        {!value && <span>Drag and Drop here </span>}
        {value && (
          <img
            alt="Uploaded"
            src={value || ""}
            className={styles.uploadedImage}
          />
        )}
      </label>
    </div>
  );
};

export default ImageInput;
