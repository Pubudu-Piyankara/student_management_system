import React from 'react';
import Input from '../Input/Input';
import { CgProfile } from "react-icons/cg";
import { IoNotificationsOutline } from "react-icons/io5";

type Props = {}

const NavBar = (props: Props) => {
  return (
    <div className="flex flex-row bg-white-300 h-full justify-between bg-slate-50 px-5 py-4 w-full">
      <div className="flex items-center"> {/* Adjust alignment for better responsiveness */}
        <Input 
          label='' 
          type='text' 
          placeholder='Search' 
          handleValueMethod={() => {}} 
        />
      </div>
      <div className="flex items-center"> {/* Adjust alignment for better responsiveness */}
        <IoNotificationsOutline className="mr-4" /> {/* Adjust spacing */}
        <CgProfile />
      </div>
    </div>
  )
}

export default NavBar;