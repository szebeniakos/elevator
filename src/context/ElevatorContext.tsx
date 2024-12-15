import React, { createContext, useContext, useState } from "react";
import { ElevatorContextType, ElevatorType } from "../store/models/models";

const ElevatorContext = createContext<ElevatorContextType | undefined>(
  undefined
);

export const ElevatorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  /* The solution functionally should be working with more than two elevators as well, however the UI is optimized for only two */
  const [elevators, setElevators] = useState<ElevatorType[]>([
    {
      id: 0,
      name: "A",
      currentLevel: 0,
      direction: 0,
      destinationLevel: 0,
      isBusy: false,
    },
    {
      id: 1,
      name: "B",
      currentLevel: 6,
      direction: 0,
      destinationLevel: 6,
      isBusy: false,
    },
    /* {
      id: 2,
      name: "C",
      currentLevel: 4,
      direction: 0,
      destinationLevel: 4,
      isBusy: false,
    }, */
  ]);

  return (
    <ElevatorContext.Provider value={{ elevators, setElevators }}>
      {children}
    </ElevatorContext.Provider>
  );
};

export const useElevator = () => {
  const context = useContext(ElevatorContext);
  if (!context) {
    throw new Error("useElevator must be used within an ElevatorProvider");
  }
  return context;
};
