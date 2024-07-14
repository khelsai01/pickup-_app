"use client";

import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { CgCopy } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface PickupLine {
  id: number;
  title: string;
  details: string;
}

const pickupLines: PickupLine[] = [
  {
    id: 1,
    title: "pickupline1",
    details: "Are you a parking ticket? Because you've got FINE written all over you!"
  },
  {
    id: 2,
    title: "pickupline2",
    details: "Is your name Google? Because you've got everything I've been searching for."
  }
];

const PickupLineComponent: React.FC = () => {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [userEmail, setUserEmail] = useState<string | undefined>("");
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    });
  };

  const handleDirect = () => {
    router.push('/pickupline');
  };

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserEmail(user?.user_metadata.name);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          setUserEmail(session.user.user_metadata.name);
        } else if (event === "SIGNED_OUT") {
          setUserEmail("");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router,supabase]);

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    router.refresh();
    router.push("/");
  }

  return (
    <div
      className="relative min-w-full min-h-screen bg-cover bg-center font-grandHotel"
      style={{ backgroundImage: "url('/pickup.png')" }}
    >
      <div className="absolute inset-0 bg-white opacity-90"></div>
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex w-[95%] sm:w-[90%] lg:w-[80%] md:justify-between items-center justify-around pt-10 px-2 ">
          <h1 className="text-[#ff4271] font-semibold sm:font-bold  text-xl sm:text-4xl md:text-5xl sm:ml-28 md:ml-44 lg:ml-64 ">
            Pickup line Generator
          </h1>
          <div>
            
            <button
              onClick={signOut}
              className="text-[#B5002C] bg-[#efbbc8] p-2 md:p-3 rounded-full text-lg sm:text-xl md:text-3xl ml-10 md:ml-2 mt-2"
            >
              SignOut
            </button>
            {userEmail && (
              <p className="text-[#B5002C]">
                {userEmail}
              </p>
            )}
          </div>
        </div>

        <div className="w-full sm:w-[60%] flex flex-col justify-start lg:justify-center lg:items-center md:m-auto p-4 mt-6">
          <div className="w-[90%] md:w-[80%] ">
            <div>
              <h2 className="text-[#d26480] text-center my-6">
                Copy the below pick up lines
              </h2>
            </div>
            {pickupLines.map((line) => (
              <div
                key={line.id}
                className="border-2 border-red-300 my-2 p-6 rounded-lg relative transform transition-transform duration-1000 hover:scale-105"
              >
                <div className="flex justify-between text-red-500 my-2 ">
                  <h2 className="sm:text-lg">{line.title}</h2>
                  <div className="relative flex items-center group">
                    <CgCopy
                      onClick={() => handleCopy(line.id, line.details)}
                      className="cursor-pointer hover:scale-150 mt-2 ease-in-out duration-1000"
                    />
                    <span className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-400 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Copy
                    </span>
                  </div>
                </div>
                <p className="text-red-400 my-2">{line.details}</p>
                {copiedId === line.id && (
                  <p className="text-green-500 text-sm mt-2">Copied!</p>
                )}
              </div>
            ))}

            <div>
              <button className="flex justify-center items-center w-[100%] mt-6 bg-[#FF2157] p-2 rounded-full text-xl md:text-3xl text-white hover:scale-105 ease-in-out duration-1000 group gap-1 text-center" onClick={handleDirect}>
                <FaHeart className="group-hover:text-red-300 mt-2" />
                <span>Regenerate pickup line</span>
                <FaHeart className="group-hover:text-red-300 mt-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupLineComponent;
