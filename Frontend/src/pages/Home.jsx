import React, { useRef, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LocationSearchPannel from "../components/LocationSearchPannel";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pannelOpen, setPannelOpen] = useState(false);
  const pannelRef = useRef(null);

  const submithandler = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  useGSAP(() => {
    if (pannelOpen) {
      gsap.to(pannelRef.current, {
        height: "70%",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(pannelRef.current, {
        height: "0%",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [pannelOpen]);

  return (
    <div className="h-screen relative">
      <div>
        <img
          src="public/uber-logo.png"
          alt=""
          className="w-16 absolute top-5 left-5"
        />
        <div className="h-screen w-screen md:w-1/2">
          <img
            className="h-full w-full object-cover"
            src="public/map_image.webp"
            alt=""
          />
        </div>
      </div>
      <div className=" absolute top-0 w-full h-screen not-first:flex flex-col justify-end md:justify-center md:w-1/2 md:right-0 md:top-1/2 md:-translate-y-1/2  ">
        <div className="p-4 h-[30%] bg-white rounded-2xl relative">
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
        <div ref={pannelRef} className="bg-amber-600 ">
          <LocationSearchPannel />
        </div>
      </div>
    </div>
  );
};

export default Home;
