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
      </head>
      <main className="font-grandHotel">
        <img
          src="/pickup.png"
          alt="pickup app"
          className="w-full h-screen object-cover sm:min-h-screen"
        />

        <div className="absolute top-[18%] md:top-[18%] lg:top-[15%] left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-4xl sm:text-5xl lg:text-3xl text-white">
          <h3>
            Pickup Line <br/><br/><span>Generator</span>
          </h3>
        </div>
        <div className="absolute top-[60%]  left-1/2 transform -translate-x-1/2 -translate-y-[60%] bg-red-400 p-2 rounded-md px-2 sm:px-4 lg:px-3 text-xl sm:text-4xl lg:text-3xl text-white "><div className="flex gap-2 mx-auto">
          <FaHeart />
          <Link href={'/login'}>Generate one for me</Link>
          <FaHeart />
        </div>
        </div>
      </main>
    </>
  );
}
