import React, { useState } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Select from "../ui/Select";
import ImageInput from "../ui/ImageInput";
import { Cat } from "../types/Cat";
import FormField from "../ui/form/FormField";
import FormProvider from "../ui/form/FormProvider";
import Form from "../ui/form/Form";
import SubmitButtons from "./SubmitButtons";
import Textarea from "../ui/Textarea";
import { validators } from "../utils/validators";
import { useStorageContext } from "../storage/StorageContext";

interface AddEditFormProps {
  onClose: () => void;
  initialValues?: Cat;
  isEdit?: boolean;
}

const DEFAULT_VALUES: Omit<Cat, "id"> = {
  name: "",
  bio: "",
  birthDate: "",
  gender: "",
  image: null
};

function AddEditForm({ onClose, initialValues, isEdit }: AddEditFormProps) {
  const storage = useStorageContext();
  const [bio, setBio] = useState(initialValues?.bio || "");
  const [name, setName] = useState(initialValues?.name || "");
  const [birthDate, setBirthDate] = useState(initialValues?.birthDate || "");
  const [gender, setGender] = useState(initialValues?.gender || "");
  const [image, setImage] = useState<string | null>(
    initialValues?.image || null
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(e.target.value);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
  };

  const handleSaveCat = () => {
    const updatedCat: Cat = {
      id: initialValues?.id || Date.now(),
      name,
      birthDate,
      bio,
      gender,
      image
    };

    storage.updateCat(updatedCat);
  };

  const handleAddCat = () => {
    const newCat: Cat = {
      id: Date.now(),
      name,
      birthDate,
      bio,
      gender,
      image
    };
    storage.addCat(newCat);
  };

  const handleSubmit = () => {
    isEdit ? handleSaveCat() : handleAddCat();
    onClose();
  };

  return (
    <Modal>
      <h2>Add a new furry friend</h2>
      <FormProvider
        onSubmit={handleSubmit}
        initialValues={initialValues || DEFAULT_VALUES}
      >
        <Form>
          <FormField
            name="name"
            label="Name"
            as={Input}
            value={name}
            validate={validators.isRequired}
            onChange={handleNameChange}
          />
          <FormField
            name="birthDate"
            label="Birthday"
            value={birthDate}
            type="date"
            as={Input}
            onChange={handleBirthDateChange}
          />
          <FormField
            name="bio"
            label="Bio (max 140 char)"
            value={bio}
            as={Textarea}
            maxLength={140}
            validate={validators.maxChar}
            onChange={handleBioChange}
          />
          <FormField
            name="gender"
            label="Gender"
            value={gender}
            as={Select}
            validate={validators.isRequired}
            onChange={handleGenderChange}
            options={[
              { value: "", label: "Select gender" },
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" }
            ]}
          />
          <FormField
            name="image"
            label="Image"
            value={image}
            as={ImageInput}
            onChange={handleImageChange}
            validate={validators.isRequired}
          />
          <SubmitButtons onClose={onClose} isEdit={!!isEdit} />
        </Form>
      </FormProvider>
    </Modal>
  );
}

export default AddEditForm;
