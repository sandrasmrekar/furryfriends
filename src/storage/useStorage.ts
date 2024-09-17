import { useState, useEffect } from "react";
import { Cat } from "../types/Cat";

function useStorage() {
  const [storedCats, setStoredCats] = useState<Cat[]>([]);
  const key = "cats";

  useEffect(() => {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      setStoredCats(JSON.parse(storedData));
    }
  }, [key]);

  const saveToStorage = (updatedItems: Cat[]) => {
    try {
      localStorage.setItem(key, JSON.stringify(updatedItems));
      setStoredCats(updatedItems);
    } catch (e: unknown) {
      if (e instanceof Error && e.name === "QuotaExceededError") {
        window.alert("Storage limit exceeded. Unable to store more data.");
      }
    }
  };

  const addCat = (item: Cat) => {
    const updatedItems = [...storedCats, item];
    saveToStorage(updatedItems);
  };

  const removeCat = (id: number) => {
    const updatedItems = storedCats.filter((item: Cat) => item.id !== id);
    saveToStorage(updatedItems);
  };

  const getCat = (id: number) => {
    return storedCats.find((item: Cat) => item.id === id);
  };

  const updateCat = (updatedItem: Cat) => {
    const updatedItems = storedCats.map((item: Cat) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    saveToStorage(updatedItems);
  };

  return {
    storedCats,
    addCat,
    removeCat,
    updateCat,
    getCat
  };
}

export default useStorage;
