import React from "react";
import { FaLocationDot } from "react-icons/fa6";

const LocationSearchPannel = () => {
  //sample data for location search pannel, you can replace it with actual data from API or state
  const locations = [
    {
      id: 1,
      name: "24B, Near's Kapoor's cafe, Sheryians Coding School, Bhopal",
    },
    {
      id: 2,
      name: "Bhopal Railway Station, Bhopal",
    },
    {
      id: 3,
      name: "DB Mall, Bhopal",
    },
  ];
  return (
    <div>
      {locations.map((location) => (
        <div key={location.id} className="flex items-center justify-start p-4 gap-4 cursor-pointer border-2  active:border-black border-olive-400 rounded-2xl mb-2">
          <h2 className="text-2xl font-semibold flex items-center min-h-10 min-w-10 rounded-full bg-gray-200 justify-center ">
            <FaLocationDot />
          </h2>
          <h4 className="font-medium">
            {location.name}
          </h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPannel;
