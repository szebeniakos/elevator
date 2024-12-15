import { FLOORS } from "../store/constants/constants";
import Floor from "./Floor";

const Building = () => {
  const floors = FLOORS;
  return (
    <div
      className={`grid grid-rows-${floors.length} gap-2 border w-[110%] mx-auto mt-10 bg-white`}
    >
      {[...floors].reverse().map((floor) => (
        <Floor floorLevel={floor} key={floor} />
      ))}
    </div>
  );
};

export default Building;
