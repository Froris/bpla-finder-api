import React, { createContext, useState } from "react";

const ComparisonContext = createContext({
  comparisonList: [],
  addToComparisonList: () => {},
  removeFromComparisonList: () => {},
});

function ComparisonProvider({ children }) {
  const [comparisonList, setComparisonList] = useState([]);

  const addToComparisonList = (bpla) => {
    setComparisonList((prevList) => [...prevList, bpla]);
  };

  const removeFromComparisonList = (bplaId) => {
    setComparisonList((prevList) =>
      prevList.filter((bpla) => bpla.id !== bplaId)
    );
  };

  const contextValue = {
    comparisonList,
    addToComparisonList,
    removeFromComparisonList,
  };

  return (
    <ComparisonContext.Provider value={contextValue}>
      {children}
    </ComparisonContext.Provider>
  );
}

export { ComparisonContext, ComparisonProvider };
