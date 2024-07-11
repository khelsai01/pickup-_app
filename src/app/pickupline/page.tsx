import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

const PickupLine = () => {
  return (
    <div
      className="relative min-w-full min-h-screen bg-cover bg-center font-grandHotel"
      style={{ backgroundImage: "url('/pickup.png')" }}
    >
      <div className="absolute inset-0 bg-white opacity-90"></div>{" "}
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex  w-[95%] sm:w-[90%] lg:w-[80%] md:justify-between items-center justify-around pt-10 px-2 ">
          <h1 className="text-[#FF2157] font-semibold sm:font-medium   text-lg sm:text-3xl md:text-5xl ">
            Pickup line Generator
          </h1>
          <button className="text-[#B5002C] bg-[#efbbc8] p-2 md:p-4 rounded-full text-lg sm:text-2xl md:text-3xl ml-10 md:ml-2 ">
            SignOut
          </button>
        </div>

        <div className="w-full sm:w-[60%] flex flex-col justify-start lg:justify-center lg:items-center md:m-auto p-4 mt-6">
          <div className="w-[90%] md:w-[80%] ">
            <form className="flex flex-col items-start">
              <label className="text-[#FF2157] my-3 text-xl w-[150%] ">
                Tell us about your crush
              </label>
              <textarea
                className="w-[100%] h-24 p-2 px-6 border-2 rounded-lg"
                placeholder="She is a 10 but. He likes football..."
              />
              <h1 className="text-[#FF2157] my-3 text-xl">Style</h1>
              <input
                type="text"
                placeholder="eg. Funny"
                className="p-2 px-6 w-[100%]  border-2 rounded-lg"
              />
              <button className="flex justify-center items-center w-[100%] mt-6 bg-[#FF2157] p-2 rounded-full text-xl md:text-3xl text-white hover:scale-110 ease-in-out duration-1000 group gap-1 text-center ">
                <FaHeart className="group-hover:text-red-300 mt-2" />
                <span> Generate one for me</span>
                <FaHeart className="group-hover:text-red-300 mt-2" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupLine;
