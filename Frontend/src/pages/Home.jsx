import React, { useRef, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LocationSearchPannel from "../components/LocationSearchPannel";
import ChooseVehicle from "../components/ChooseVehicle";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pannelOpen, setPannelOpen] = useState(false);
  const [vehiclePannel, setVehiclePannel] = useState(false);
  const pannelRef = useRef(null);
  const vehiclePannelRef = useRef(null);

  const submithandler = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  useGSAP(() => {
    if (pannelOpen) {
      gsap.to(pannelRef.current, {
        height: "70%",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(pannelRef.current, {
        height: "0%",
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [pannelOpen]);
  
  useGSAP(() => {
    if (vehiclePannel) {
      gsap.to(vehiclePannelRef.current, {
        height: "70%",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(vehiclePannelRef.current, {
        height: "0%",
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [vehiclePannel]);

  return (
    <div className="h-screen relative overflow-hidden">
      <div>
        <img
          src="/uber-logo.png"
          alt=""
          className="w-16 absolute top-5 left-5"
        />
        <div className="h-screen w-screen md:w-1/2">
          <img
            className="h-full w-full object-cover"
            src="/map_image.webp"
            alt=""
          />
        </div>
      </div>
      <div className=" absolute top-0 w-full h-screen not-first:flex flex-col justify-end md:justify-center md:w-1/2 md:right-0 md:top-1/2 md:-translate-y-1/2  ">
        <div className="p-4 h-[30%] bg-white  relative">
          <h5
            onClick={() => {
              setPannelOpen(!pannelOpen);
            }}
            className={`absolute top-6 right-6 text-2xl ${pannelOpen ? "" : "rotate-180"} cursor-pointer transition-transform duration-300`}
          >
            <MdOutlineKeyboardArrowDown />
          </h5>
          <h4 className="text-2xl font-semibold mt-2">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[30%] left-8 bg-gray-900 rounded-full"></div>
            <input
              className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full mb-3"
              value={pickup}
              onClick={() => {
                setPannelOpen(true);
              }}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
              type="text"
              placeholder="Add a pickup location"
            />
            <input
              className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full mb-3"
              value={destination}
              onClick={() => {
                setPannelOpen(true);
              }}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={pannelRef} className="bg-white overflow-hidden opacity-0  ">
          <LocationSearchPannel vehiclePannel={vehiclePannel} setVehiclePannel={setVehiclePannel} />
        </div>
      </div>
      <div ref={vehiclePannelRef} className="fixed z-10 bottom-0 bg-white w-full p-4 translate-y-full md:justify-center md:w-1/2 md:right-0 md:top-1/2 md:-translate-x-full">
        <div className="text-2xl font-semibold mb-5">Choose a Vehicle</div>

        <ChooseVehicle
          vehicleName="UberGo"
          vehicleImage="/car.webp"
          vehiclePassengers={4}
          vehicleTime="2"
          vehiclePrice={193.2}
        />

        <ChooseVehicle
          vehicleName="Moto"
          vehicleImage="/bike.webp"
          vehiclePassengers={1}
          vehicleTime="3"
          vehiclePrice={290.5}
        />

        <ChooseVehicle
          vehicleName="UberAuto"
          vehicleImage="/auto.webp"
          vehiclePassengers={3}
          vehicleTime="5"
          vehiclePrice={390.75}
        />
      </div>
    </div>
  );
};

export default Home;
