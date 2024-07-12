"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { FaHeart } from "react-icons/fa";

interface Message {
  message: string;
  direction: "outgoing" | "incoming";
  sender: "user" | "ChatGPT";
}
const API_KEY = "sk-proj-xYQFtw2Y3mwol3RkC5wKT3BlbkFJaAJ9wdijiUGwAYAHYhB5";

const PickupLine: React.FC = () => {
  const [pickupline, setPickupline] = useState<Message[]>([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      direction: "incoming",
      sender: "ChatGPT",
    },
  ]);

  const [inputPickup, setInputPickup] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputPickup(e.target.value);
  };

  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPickup: Message = {
      message: inputPickup,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...pickupline, newPickup];
    setPickupline(newMessages);
    setInputPickup("");
    setIsTyping(true);

    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages: Message[]) {
    const apiMessages = chatMessages.map((messageObject) => {
      return {
        role: messageObject.sender === "ChatGPT" ? "assistant" : "user",
        content: messageObject.message,
      };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [apiMessages],
    };

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
        }
      );

      const data = await response.json();
      console.log(data);
      // setPickupline((prevMessages) => [
      //   ...prevMessages,
      //   {
      //     message: data.choices[0].message.content,
      //     direction: 'incoming',
      //     sender: "ChatGPT",
      //   },
      // ]);
    } catch (error) {
      console.error("Error processing message to ChatGPT:", error);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div
      className="relative min-w-full min-h-screen bg-cover bg-center font-grandHotel"
      style={{ backgroundImage: "url('/pickup.png')" }}
    >
      <div className="absolute inset-0 bg-white opacity-90"></div>
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex w-[95%] sm:w-[90%] lg:w-[80%] md:justify-between items-center justify-around pt-10 px-2 ">
          <h1 className="text-[#FF2157] font-semibold sm:font-medium text-xl sm:text-3xl md:text-5xl ">
            Pickup line Generator
          </h1>
          <button className="text-[#B5002C] bg-[#efbbc8] p-2 md:p-3 rounded-full text-lg sm:text-xl md:text-3xl ml-10 md:ml-2 ">
            SignOut
          </button>
        </div>

        <div className="w-full sm:w-[60%] flex flex-col justify-start lg:justify-center lg:items-center md:m-auto p-4 mt-6">
          <div className="w-[90%] md:w-[80%] ">
            <form className="flex flex-col items-start" onSubmit={handleSend}>
              <label className="text-[#FF2157] my-3 text-xl w-[150%] ">
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
              <button className="flex justify-center items-center w-[100%] mt-6 bg-[#FF2157] p-2 rounded-full text-xl md:text-3xl text-white   group gap-1 text-center hover:scale-105 ease-in-out duration-1000 ">
                <FaHeart className="group-hover:text-red-300 group-hover:scale-150 mt-2 ease-in-out duration-1000" />
                <span >Generate one for me</span>
                <FaHeart className="group-hover:text-red-300 mt-2 group-hover:scale-150  ease-in-out duration-1000" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupLine;
