import { createContext } from "react";

export const FormContext = createContext({
  states: {},
  isEditing: false,
  setIsEditing: () => {},
});
