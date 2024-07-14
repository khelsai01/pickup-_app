"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { FaHeart } from "react-icons/fa";

interface Message {
  message: string;
  direction: "outgoing" | "incoming";
  sender: "user" | "ChatGPT";
}

const PickupLine: React.FC = () => {
  const [pickupline, setPickupline] = useState<Message[]>([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      direction: "incoming",
      sender: "ChatGPT",
    },
  ]);
  const [inputPickup, setInputPickup] = useState<string>("");
  const [generating, setGenerating] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | undefined>("");
  const router = useRouter();


  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputPickup(e.target.value);
  };

   const handleSend = async (e: FormEvent<HTMLFormElement>) => {
   e.preventDefault();
  //   const newPickup: Message = {
  //     message: inputPickup,
  //     direction: "outgoing",
  //     sender: "user",
  //   };

  //   const newMessages = [...pickupline, newPickup];
  //   setPickupline(newMessages);
  //   setInputPickup("");

     //   await processMessageToChatGPT(newMessages);
     setGenerating(true);
     router.push("/pickupline/pickup");
  };

  // async function processMessageToChatGPT(chatMessages: Message[]) {
  //   const apiMessages = chatMessages.map((messageObject) => {
  //     return {
  //       role: messageObject.sender === "ChatGPT" ? "assistant" : "user",
  //       content: messageObject.message,
  //     };
  //   });

  //   const apiRequestBody = {
  //     model: "gpt-3.5-turbo",
  //     messages: apiMessages,
  //   };

  //   try {
  //     const response = await fetch(
  //       "https://api.openai.com/v1/chat/completions",
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${process.env.YOUR_OPENAI_API_KEY}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(apiRequestBody),
  //       }
  //     );

  //     const data = await response.json();
  //     setPickupline((prevMessages) => [
  //       ...prevMessages,
  //       {
  //         message: data.choices[0].message.content,
  //         direction: "incoming",
  //         sender: "ChatGPT",
  //       },
  //     ]);
  //   } catch (error) {
  //     console.error("Error processing message to ChatGPT:", error);
  //   }
  // }

  const handleGenerate = () => {
    setGenerating(true);
    router.push("/pickupline/pickup");
  };

  const supabase = createClientComponentClient();

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
          setUserEmail(session.user?.user_metadata.name);
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
        <div className="flex w-[95%] sm:w-[95%] md:w-[95%] md:justify-between items-center justify-around pt-10 px-2">
          <h1 className="text-[#FF2157] font-semibold sm:font-bold text-xl sm:text-3xl md:text-4xl sm:ml-28 md:ml-36 lg:ml-80">
            Pickup line Generator
          </h1>
          <div>
            
            <button
              onClick={signOut}
              className="text-[#B5002C] bg-[#efbbc8] p-2  rounded-full text-md sm:text-lg md:text-3xl ml-10 md:ml-2 mt-2"
            >
              SignOut
            </button>
            {userEmail && (
              <p className="text-[#B5002C] text-[12px] sm:text-[16px] text-center mt-2">
                {userEmail}
              </p>
            )}
          </div>
        </div>

        <div className="w-full sm:w-[60%] flex flex-col justify-start lg:justify-center lg:items-center md:m-auto p-4 mt-6">
          <div className="w-[90%] md:w-[80%]">
            <form className="flex flex-col items-start" onSubmit={handleSend}>
              <label className="text-[#FF2157] my-3 text-xl w-[150%]">
                Tell us about your crush
              </label>
              <textarea
                value={inputPickup}
                onChange={handleInputChange}
                className="w-[100%] h-24 p-2 px-6 border-2 rounded-lg text-red-500"
                placeholder="She is a 10 but. He likes football..."
                autoFocus
              />
              <h1 className="text-[#FF2157] my-3 text-xl">Style</h1>
              <input
                type="text"
                placeholder="e.g., Funny"
                className="p-2 px-6 w-[100%] border-2 rounded-lg text-red-500"
              />
              <button
                className="flex justify-center items-center w-[100%] mt-6 bg-[#FF2157] p-2 rounded-full text-xl md:text-3xl text-white group gap-1 text-center hover:scale-105 ease-in-out duration-1000"
                onClick={handleGenerate}
              >
                <FaHeart className="group-hover:text-red-300 group-hover:scale-150 mt-2 ease-in-out duration-1000" />
                <span>Generate one for me</span>
                <FaHeart className="group-hover:text-red-300 mt-2 group-hover:scale-150 ease-in-out duration-1000" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupLine;
