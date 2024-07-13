import React from 'react'
import { signInWithGoogle } from './login'

const Googlelogin = () => {
  return (
    <div  className="rounded-lg border-2 p-2 sm:px-4 flex justify-center items-center mx-auto sm:gap-2 cursor-pointer" onClick={()=>signInWithGoogle()}>
    <img src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-pks9lbdv.png" alt="google" className=" w-8 h-8 sm:w-10 sm:h-10 " />
  <h2 className="text-sm sm:text-md font-medium sm:font-semibold">Sign up with google</h2>
</div>
  )
}

export default Googlelogin
