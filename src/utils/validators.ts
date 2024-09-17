export const validators = {
  isRequired: (value: string | number | null) =>
    (!value || value === "") && "is required",
  maxChar: (value: string, max?: number) => {
    const maxChar = max || 140;
    return value?.length > maxChar && `maxChar ${maxChar} characters`;
  }
};
