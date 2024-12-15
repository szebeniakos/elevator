import Elevator from "./Elevator";
import { FloorProps, ElevatorType } from "../store/models/models";
import { useElevator } from "../context/ElevatorContext";
import { moveElevator } from "../store/shared/shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faChevronUp,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Floor = (props: FloorProps) => {
  const { elevators, setElevators } = useElevator();
  const { floorLevel } = props;

  /* Returns the closest elevator object to a specific floor */
  const getClosestElevator = (currentFloor: number) => {
    if (!elevators || elevators.length === 0) {
      console.error("No elevators available!");
      return null;
    }
    if (
      elevators.some(
        (elevator) =>
          !elevator.isBusy && elevator.destinationLevel === currentFloor
      )
    ) {
      console.log("A free elevator is already on this this floor. Aborting...");
      return null;
    }
    if (
      elevators.some(
        (elevator) =>
          elevator.isBusy && elevator.destinationLevel === currentFloor
      )
    ) {
      console.log(
        "An elevator is already on its way to this floor. Aborting..."
      );
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

    moveElevator(selectedElevator, toFloor, setElevators);
  };

  return (
    <div
      key={floorLevel}
      className="row-span-12 p-4 flex justify-between items-center border bg-gray-100 min-w-200"
    >
      <div className="flex items-center space-x-4">
        <div className="text-lg font-medium">Floor {floorLevel}</div>
        <button
          className="w-10 h-10 text-white bg-green-600 text-sm font-bold rounded-full shadow-md border-2 border-green-600 flex items-center justify-center transition-transform transform hover:scale-110 hover:bg-green-700 hover:shadow-lg"
          onClick={() => callElevator(floorLevel)}
        >
          <FontAwesomeIcon icon={faChevronUp} className="text-white" />
        </button>
        <button
          className="w-10 h-10 text-white bg-red-600 text-sm font-bold rounded-full shadow-md border-2 border-red-600 flex items-center justify-center transition-transform transform hover:scale-110 hover:bg-red-700 hover:shadow-lg"
          onClick={() => callElevator(floorLevel)}
        >
          <FontAwesomeIcon icon={faChevronDown} className="text-white" />
        </button>
      </div>
      {/* Elevators */}
      <div className="grid grid-cols-2 gap-4">
        {elevators.map((elevator) =>
          elevator.currentLevel === floorLevel ? (
            <div className="flex justify-center min-h-25" key={elevator.id}>
              <Elevator elevator={elevator} />
            </div>
          ) : (
            <div className="flex justify-center min-h-25" key={elevator.id}>
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
                <FontAwesomeIcon icon={faArrowUp} className="text-green-500" />
              ) : elevator.direction < 0 ? (
                <FontAwesomeIcon icon={faArrowDown} className="text-red-500" />
              ) : (
                <FontAwesomeIcon icon={faCircle} className="text-gray-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Floor;
