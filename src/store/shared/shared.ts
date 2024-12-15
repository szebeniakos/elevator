import { ELEVATOR_DELAY } from "../constants/constants";
import { Direction, ElevatorType } from "../models/models";

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/* We move the elevator floor by floor to the given direction */
export const moveElevator = async (
  elevator: ElevatorType,
  toFloor: number,
  setElevators: React.Dispatch<React.SetStateAction<ElevatorType[]>>
) => {
  const { id, name, currentLevel } = elevator;

  const direction = toFloor > currentLevel ? Direction.Up : Direction.Down;

  for (let level = currentLevel; level !== toFloor; level += direction) {
    setElevators((prevElevators) =>
      prevElevators.map((e) =>
        e.id === id
          ? {
              ...e,
              currentLevel: level,
              direction,
              destinationLevel: toFloor,
              isBusy: true,
            }
          : e
      )
    );
    console.log(`Elevator ${name} is moving to floor ${level + direction}`);
    await sleep(ELEVATOR_DELAY);
  }
  setElevators((prevElevators) =>
    prevElevators.map((e) =>
      e.id === id
        ? {
            ...e,
            currentLevel: toFloor,
            direction: 0,
            destinationLevel: toFloor,
            isBusy: false,
          }
        : e
    )
  );
  console.log(`Elevator ${name} has arrived to floor ${toFloor}`);
};
