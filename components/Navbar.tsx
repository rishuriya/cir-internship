import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import Router from "next/router";
import {AiOutlineFileAdd,AiOutlineCheck, AiFillHome,AiOutlineMenu,AiOutlineClose} from 'react-icons/ai';


const navOptions = [
  {
    name: 'Home',
    description: 'Get a better understanding of where your traffic is coming from.',
    href: '/',
    icon: AiFillHome,
  },
  {
    name: 'Add Internship',
    description: 'Speak directly to your customers in a more meaningful way.',
    href: '/form',
    icon: AiOutlineFileAdd,
  },
  {
    name: 'Approved Internships',
    description: "Connect with third-party tools that you're already using.",
    href: '#',
    icon: AiOutlineCheck,
  },
 
]


export default function Navbar(prop) {


  const [auth, setAuth] = useState(true)
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("AM.EN.U4CSE21115");

  useEffect(() => {
    if (!auth) {
      Router.push("/login");
    }
  }, [auth])

  return (
    <Popover className="relative bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-2 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="/">
              <span className="sr-only">Amrita Vishwa Vidyapeetham</span>
              <img
                className="h-10 w-auto sm:h-16"
                src="https://upload.wikimedia.org/wikipedia/en/f/f8/Amrita-vishwa-vidyapeetham-color-logo.png"
                alt=""
              />
            </a>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <AiOutlineMenu className="h-7 w-7" aria-hidden="true" />
            </Popover.Button>
          </div>

          <Popover.Group as="nav" className="hidden space-x-5 md:space-x-10 md:flex">
            <a href="/" className=" py-2 font-medium text-gray-500 hover:text-gray-900">
              Home
            </a>
            <a href="/form" className="py-2 font-medium text-gray-500 hover:text-gray-900 whitespace-nowrap">
              Add Internship
            </a>         
          </Popover.Group>

          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            {auth?
              <>
              <div className='truncate w-62 py-2 px-3 bg-slate-200/30 rounded-xl'>
                {user}
              </div>
             <a
              href="#"
              className="ml-2 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-pink-900">
              Sign Out
             </a>
            </>
            :<div className='space-x-5'>
              <a
              href="/login"
              className="inline-flex items-center justify-center whitespace-nowrap text-primary px-4 py-2 text-base font-medium hover:text-pink-900 hover:underline">
               Login
              </a>
             <a
              href="/signup"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-pink-900">
                Signup
              </a>
               </div>
            }
            
          </div>

        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95">
        <Popover.Panel focus className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">

              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://upload.wikimedia.org/wikipedia/en/f/f8/Amrita-vishwa-vidyapeetham-color-logo.png"
                    alt="Your Company"
                  />
                </div>
               
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <AiOutlineClose className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className='truncate py-2 px-3 my-5 bg-slate-200/30 rounded-xl'>
                  {user}
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {navOptions.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                    >
                      <item.icon className="h-6 w-6 flex-shrink-0 text-primary" aria-hidden="true" />
                      <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                    </a>
                  ))} 
                </nav>
              </div>
            </div>
            <div className="space-y-6 py-6 px-5">
             
              <div>
                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-pink-900"
                >
                  Sign out
                </a>
                
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
