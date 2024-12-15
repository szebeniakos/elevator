import Elevator from "./Elevator";
import { FloorProps, ElevatorType } from "../store/models/models";
import { useElevator } from "../context/ElevatorContext";
import {
  ELEVATOR_DELAY,
  ELEVATOR_DIRECTIONS,
} from "../store/constants/constants";
import { sleep } from "../store/utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Floor = (props: FloorProps) => {
  const { elevators, setElevators } = useElevator();
  const { floorLevel } = props;

  /* Returns the closest elevator object to a specific floor */
  const getClosestElevator = (currentFloor: number) => {
    if (!elevators || elevators.length === 0) {
      console.log("No elevators available!");
      return null;
    }

    console.log(
      `Elevator called to floor ${currentFloor}. Finding the closest elevator...`
    );
    let closestElevators: ElevatorType[] = [];
    let minDistance = Infinity;

    /* Finding the closest elevators */
    elevators.forEach((elevator) => {
      if (!elevator.isBusy) {
        const distance = Math.abs(currentFloor - elevator.currentLevel);

        if (distance < minDistance) {
          minDistance = distance;
          closestElevators = [elevator];
        } else if (distance === minDistance) {
          closestElevators.push(elevator);
        }
      }
    });

    if (closestElevators.length < 1) {
      console.log("There is no free elevator at the moment.");
      return null;
    }

    /* If there are more than one elevators available with the same distance, we will only keep the one with the lowest level */
    if (closestElevators.length > 1) {
      closestElevators = [
        closestElevators.reduce((bestElevator, currentElevator) => {
          return currentElevator.currentLevel < bestElevator.currentLevel
            ? currentElevator
            : bestElevator;
        }),
      ];
    }

    const [closestElevator] = closestElevators;
    console.log(
      `The closest non-busy elevator to floor ${currentFloor} is Elevator ${closestElevator.name}`
    );
    return closestElevator;
  };

  const callElevator = async (toFloor: number) => {
    let selectedElevator = getClosestElevator(toFloor);

    if (!selectedElevator) return;

    const { currentLevel } = selectedElevator;
    const direction =
      toFloor > currentLevel
        ? ELEVATOR_DIRECTIONS.UP
        : ELEVATOR_DIRECTIONS.DOWN;

    /* We move the lift level by level to the specific direction */
    for (let level = currentLevel; level !== toFloor; level += direction) {
      setElevators((prevElevators) =>
        prevElevators.map((e) =>
          e.id === selectedElevator.id
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
      console.log(
        `Elevator ${selectedElevator.name} is moving to floor ${
          level + direction
        }`
      );
      await sleep(ELEVATOR_DELAY);
    }

    setElevators((prevElevators) =>
      prevElevators.map((e) =>
        e.id === selectedElevator.id
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
    console.log(
      `Elevator ${selectedElevator.name} has arrived to floor ${toFloor}`
    );
  };

  return (
    <div
      key={floorLevel}
      className="row-span-12 p-4 flex justify-between items-center border bg-gray-100"
    >
      <div className="flex items-center space-x-2">
        <div>Floor {floorLevel}</div>
        <button
          className="w-8 h-8 text-green-600 text-sm font-bold rounded-full shadow-md hover:text-green-700 border-2 border-green-600 flex items-center justify-center"
          onClick={() => callElevator(floorLevel)}
        >
          <FontAwesomeIcon icon={faChevronUp} className="text-green-600" />
        </button>
        <button
          className="w-8 h-8 text-red-600 text-sm font-bold rounded-full shadow-md hover:text-red-700 border-2 border-red-600 flex items-center justify-center"
          onClick={() => callElevator(floorLevel)}
        >
          <FontAwesomeIcon icon={faChevronDown} className="text-red-600" />
        </button>
      </div>
      {/* Elevators */}
      <div className="grid grid-cols-2 gap-4">
        {elevators.map((elevator) =>
          elevator.currentLevel === floorLevel ? (
            <div className="flex justify-center" key={elevator.id}>
              <Elevator elevator={elevator} />
            </div>
          ) : (
            <div
              className="flex justify-center"
              style={{ minHeight: "100px" }}
              key={elevator.id}
            >
              {/* Placeholder */}
            </div>
          )
        )}
      </div>
      {/* Elevator directions */}
      <div className="flex items-center space-x-6 mt-4">
        {elevators.map((elevator) => (
          <div className="flex items-center space-x-2" key={elevator.id}>
            <span className="font-bold">{elevator.name}:</span>
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
              {elevator.direction > 0 ? (
                <span className="text-green-500">⬆</span>
              ) : elevator.direction < 0 ? (
                <span className="text-red-500">⬇</span>
              ) : (
                <span className="text-gray-500">●</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Floor;
