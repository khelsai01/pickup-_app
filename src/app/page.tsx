"use client";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
export default function Home() {
  return (
    <>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Grand+Hotel&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="https://w7.pngwing.com/pngs/820/953/png-transparent-love-hearts-love-hearts-red-heart-love-heart-computer-icons-thumbnail.png"
        />
      </head>
      <main className="font-grandHotel">
        <img
          src="/pickup.png"
          alt="pickup app"
          className="w-full h-screen object-cover sm:min-h-screen"
        />

        <div className="absolute top-[18%] md:top-[18%] lg:top-[10%] left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-3xl sm:text-4xl lg:text-3xl text-white hover:scale-110 duration-500">
          <h3>
            Pickup Line <br />
            <br />
            <span>Generator</span>
          </h3>
        </div>
        <div className="absolute top-[60%]  left-1/2 transform -translate-x-1/2 -translate-y-[60%] bg-red-400 p-2 rounded-md px-2 sm:px-2 lg:px-3 text-lg sm:text-4xl lg:text-3xl text-white hover:scale-110 ease-in-out duration-500 group">
          <div className="flex gap-2 mx-auto">
            <FaHeart className="group-hover:text-red-600" />
            <Link href={"/login"}>Generate one for me</Link>
            <FaHeart className="group-hover:text-red-600" />
          </div>
        </div>
      </main>
    </>
  );
}
