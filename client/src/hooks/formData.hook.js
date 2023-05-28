import { useState, useRef } from "react";
import { FormContext } from "../context/formContext";

export function useFormData() {
  const [isEditing, setIsEditing] = useState(false);

  const states = useRef();

  let tempStates = {
    photos: [],
    images: [],
    _name: "",
    model: "",
    shortDescription: "",
    description: "",
    sourceUrl: "",
    vendor: "",
    contryVendor: "",
    typeEngine: "",
    functions: [],
    levelsApply: [],
    levelWarActions: "",
    _class: "",
    flightRange: 0,
    wingspan: 0,
    maxFlyWeight: 0,
    payloadWeight: 0,
    maxSpeed: 0,
    cruiseSpeed: 0,
    maxFlyHeight: 0,
    heightOfUse: 0,
    flyDuration: 0,
  };

  function saveStates() {
    states.current = tempStates;
  }

  if (!isEditing) {
    saveStates();
  }

  function FormProvider({ children }) {
    return (
      <FormContext.Provider
        value={{
          states,
          isEditing,
          setIsEditing,
        }}
      >
        {children}
      </FormContext.Provider>
    );
  }

  return { FormProvider };
}
