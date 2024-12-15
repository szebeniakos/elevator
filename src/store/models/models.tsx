export interface FloorProps {
  floorLevel: number;
}

export interface ElevatorProps {
  elevator: ElevatorType;
}

export interface FloorType {
  id: number;
  level: number;
}

export type ElevatorContextType = {
  elevators: ElevatorType[];
  setElevators: React.Dispatch<React.SetStateAction<ElevatorType[]>>;
};

export interface ElevatorType {
  id: number;
  name: string;
  currentLevel: number;
  destinationLevel: number;
  direction: number;
  isBusy: boolean;
}
