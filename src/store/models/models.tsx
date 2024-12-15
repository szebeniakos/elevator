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

export enum Direction {
  Idle = 0,
  Up = 1,
  Down = -1,
}

export interface ElevatorType {
  id: number;
  name: string;
  currentLevel: number;
  destinationLevel: number;
  direction: Direction;
  isBusy: boolean;
}
