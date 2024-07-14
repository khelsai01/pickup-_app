"use client";
import { FaHeart } from "react-icons/fa";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const Login = () => {
  const supabase = createClientComponentClient();

  const handleSignInWithGoogle = async () => {
    const res = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="bg-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <div className="flex flex-col  justify-center items-center text-center m-auto gap-4">
          <div className="bg-red-400 w-12 h-12 p-4 rounded-md text-center">
            <FaHeart className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-sm sm:text-lg font-semibold">
              Pickup line generator
            </h2>
            <p className="text-[10px] sm:text-[14px] text-gray-400 mt-4">
              Generate pickup line for your crush now!
            </p>
          </div>
          <div
            className="rounded-lg border-2 p-2 sm:px-4 flex justify-center items-center mx-auto sm:gap-2 cursor-pointer"
            onClick={handleSignInWithGoogle}
          >
            <img
              src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-pks9lbdv.png"
              alt="google"
              className=" w-8 h-8 sm:w-10 sm:h-10 "
            />
            <h2 className="text-sm sm:text-md font-medium sm:font-semibold">
              Sign up with google
            </h2>
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 -translate-y-10 text-center">
        <p className="text-[12px] md:text-xl text-gray-400 mt-4">
          By signing up, you agree to the Terms of Use, Privacy Notice
        </p>
      </div>
    </div>
  );
};

export default Login;
