import React from 'react'
import { NavLink } from 'react-router-dom'
import { links } from '../constant/Constants'

const Navbar = () => {
  return (
    <aside className=' max-md:justify-normal flex flex-col h-screen justify-between items-center p-3 max-md:p-2 max-md:gap-20 lg:p-10'>
        <img className='w-[150px] max-md:w-[90px]' src="../recipelogo.png" alt="RecipeLogo" />

        <div className='flex flex-col gap-20'>
            {links.map((item)=>(
                <NavLink to={item.path} className={"flex gap-4 items-center text-lg text-gray-400"}>
                    <span className='max-md:text-2xl'>{item.icon}</span>
                    <span className='max-md:hidden'>{item.title}</span>
                </NavLink>
            ))}
        </div>

        <div className='flex flex-col gap-2 max-md:hidden'>
          <p className='font-semibold'>Günlük Haberleri Al</p>
          <button className='bg-red-500 hover:bg-red-400 text-white rounded-lg gap-2 max-md:hidden'>Abone Ol</button>
        </div>
    </aside>
  )
}

export default Navbar