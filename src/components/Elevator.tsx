import { ElevatorProps } from "../store/models/models";
import { useElevator } from "../context/ElevatorContext";
import {
  ELEVATOR_DELAY,
  ELEVATOR_DIRECTIONS,
  FLOORS,
} from "../store/constants/constants";
import { sleep } from "../store/utils/utils";

const Elevator = (props: ElevatorProps) => {
  const { id, name, direction, currentLevel, isBusy } = props.elevator;
  const { setElevators } = useElevator();
  const floors = FLOORS;

  const moveElevatorToFloor = async (toFloor: number) => {
    console.log(`Elevator ${name} was directed to floor ${toFloor}`);
    if (currentLevel == toFloor) {
      console.log(
        `Elevator ${name} is already on floor ${toFloor}. Aborting...`
      );
      return;
    }

    if (isBusy) {
      console.log(`Elevator ${name} is already in move. Aborting... `);
      return;
    }

    const direction =
      toFloor > currentLevel
        ? ELEVATOR_DIRECTIONS.UP
        : ELEVATOR_DIRECTIONS.DOWN;

    /* We move the lift level by level to the specific direction */
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

  return (
    <>
      <div className="flex flex-col items-center bg-gray-100 border border-gray-400 p-4 rounded-lg shadow-md">
        <div className="flex space-x-1">
          <div className="w-8 h-8 bg-blue-500 text-center text-white font-bold mb-2">
            {name}
          </div>
          <span className="w-8 h-8 bg-black text-white flex items-center justify-center rounded">
            {currentLevel}
          </span>
          {direction === ELEVATOR_DIRECTIONS.UP ? (
            <div className="w-8 h-8 bg-green-500 text-white flex items-center justify-center rounded">
              ↑
            </div>
          ) : direction === ELEVATOR_DIRECTIONS.DOWN ? (
            <div className="w-8 h-8 bg-red-500 text-white flex items-center justify-center rounded">
              ↓
            </div>
          ) : (
            <div className="w-8 h-8 bg-gray-400 text-white flex items-center justify-center rounded">
              —
            </div>
          )}
        </div>

        <div className="flex flex-wrap space-x-1">
          {floors.map((floor) => (
            <button
              key={floor}
              className="w-6 h-6 bg-cyan-200 text-gray text-xs rounded"
              onClick={() => moveElevatorToFloor(floor)}
            >
              {floor}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Elevator;
