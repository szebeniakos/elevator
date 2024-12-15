import { Direction, ElevatorProps } from "../store/models/models";
import { FLOORS } from "../store/constants/constants";
import { moveElevator } from "../store/shared/shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useElevator } from "../context/ElevatorContext";

const Elevator = (props: ElevatorProps) => {
  const { name, direction, currentLevel, isBusy } = props.elevator;
  const floors = FLOORS;

  const { setElevators } = useElevator();

  const moveElevatorToFloor = async (toFloor: number) => {
    console.log(`Elevator ${name} was directed to floor ${toFloor}`);
    if (currentLevel == toFloor) {
      console.log(
        `Elevator ${name} is already on floor ${toFloor}. Aborting...`
      );
      return null;
    }

    if (isBusy) {
      console.log(`Elevator ${name} is already in move. Aborting... `);
      return null;
    }
    moveElevator(props.elevator, toFloor, setElevators);
  };

  return (
    <>
      <div className="flex flex-col items-center bg-gray-100 border border-gray-400 p-4 rounded-lg shadow-md">
        {/* Elevator state indicators */}
        <div className="flex space-x-1 mb-2">
          <div className="w-8 h-8 bg-blue-500 text-center text-white font-bold flex items-center justify-center rounded">
            {name}
          </div>
          <span className="w-8 h-8 bg-black text-white font-bold flex items-center justify-center rounded">
            {currentLevel}
          </span>
          {direction === Direction.Up ? (
            <div className="w-8 h-8 bg-green-500 text-white flex items-center justify-center rounded">
              <FontAwesomeIcon icon={faChevronUp} />
            </div>
          ) : direction === Direction.Down ? (
            <div className="w-8 h-8 bg-red-500 text-white flex items-center justify-center rounded">
              <FontAwesomeIcon icon={faChevronDown} />
            </div>
          ) : (
            <div className="w-8 h-8 bg-gray-400 text-white flex items-center justify-center rounded">
              —
            </div>
          )}
        </div>
        {/* Elevator buttons */}
        <div className="flex flex-wrap space-x-1">
          {floors.map((floor) => (
            <button
              key={floor}
              className="w-6 h-6 bg-cyan-200 text-gray-700 font-bold text-xs rounded transition-transform transform hover:scale-105 hover:bg-cyan-300"
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
