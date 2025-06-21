import { TreeDeciduous } from 'lucide-react';
import React from 'react'
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full text-rose-950">
      <div className="hidden lg:flex items-center justify-center bg-rose-950 w-1/2 px-12">
        <div className="max-w-md space-y-2 text-center text-primary-foreground">
          <TreeDeciduous className='mx-auto'/>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Hii Audience! 
          </h1>
          <p className='opacity-60'>Get the ultimate shopping experience</p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout