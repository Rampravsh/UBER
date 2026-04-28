import React from "react";
import { FaUser } from "react-icons/fa";

const ChooseVehicle = ({vehicleName, vehicleImage, vehiclePassengers, vehicleTime, vehiclePrice}) => {
  return (
    <>
      <div className="flex items-center justify-between cursor-pointer border-2  active:border-black border-olive-400 rounded-2xl p-2 my-2">
        <img className="h-20" src={vehicleImage} alt="" />
        <div className=" w-full ml-2">
          <h4 className="font-medium text-lg flex items-center gap-2">
            {vehicleName}
            <span className="flex items-center">
              <FaUser />{vehiclePassengers}
            </span>
          </h4>
          <h5 className="font-medium text-sm">{vehicleTime} mins away</h5>
          <p className="font-medium text-xs">Affordable,commpact rides</p>
        </div>
        <h2 className="text-xl font-semibold">₹{vehiclePrice.toFixed(2)}</h2>
      </div>
    </>
  );
};

export default ChooseVehicle;
