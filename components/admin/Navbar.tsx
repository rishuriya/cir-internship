import Link from 'next/link';
import cookie from 'js-cookie'; 
import Router from "next/router";
import { RootState } from '../../store'
import { unsetUser } from '../../slices/userSlice'
import { useSelector,useDispatch } from 'react-redux'
import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {AiOutlineFileAdd,AiFillHome,AiOutlineMenu,AiOutlineClose,AiOutlineUserAdd} from 'react-icons/ai';

const navOptions = [
  {
    name: 'Home',
    description: 'Get a better understanding of where your traffic is coming from.',
    href: '/admin',
    icon: AiFillHome,
  },
  {
    name: 'Approved internships',
    description: 'Speak directly to your customers in a more meaningful way.',
    href: '/admin/approved-internships',
    icon: AiOutlineFileAdd,
  },
  {
    name: 'Add Admin',
    description: "Connect with third-party tools that you're already using.",
    href: '/admin/add-admin',
    icon: AiOutlineUserAdd,
  },
 
]


export default function Navbar() {

  const authUser = useSelector((state: RootState) => state.user.value)
  const [auth, setAuth] = useState(null)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAuth(authUser);
  })

  const dispatch = useDispatch();
  const signOut=()=>{
    cookie.remove("token");
    dispatch(unsetUser());
    Router.push("/login");
  }

  return (
    <Popover className="relative bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-2 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/admin">
              {/* <span className="sr-only">Amrita Vishwa Vidyapeetham</span> */}
              <img
                className="h-10 w-auto sm:h-16"
                src="https://upload.wikimedia.org/wikipedia/en/f/f8/Amrita-vishwa-vidyapeetham-color-logo.png"
                alt=""
              />
            </Link>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <AiOutlineMenu className="h-7 w-7" aria-hidden="true" />
            </Popover.Button>
          </div>

          <Popover.Group as="nav" className="hidden space-x-5 md:space-x-10 md:flex">
          <div className=" py-2 m-1 px-3 font-medium text-gray-700 hover:text-gray-900 border-2 hover:border-primary shadow-md rounded-md cursor-pointer">
          <Link href="/admin">
            Home
          </Link>
          </div>
          <div className=" py-2 m-1 px-3 font-medium text-gray-700 hover:text-gray-900 border-2 hover:border-primary shadow-md rounded-md cursor-pointer">
          <Link href="/admin/approved-internships">
          Approved Internships
          </Link>
          </div>
          <div className=" py-2 m-1 px-3 font-medium text-gray-700 hover:text-gray-900 border-2 hover:border-primary shadow-md rounded-md cursor-pointer">
          <Link href="/admin/signup">
          Add Admin
          </Link>
          </div>         
          </Popover.Group>

          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            {auth?
              <>
              <div className='truncate w-62 py-2 px-3 text-lg  bg-slate-200/30 rounded-xl'>
                {auth.name}
              </div>
             <button
              onClick={signOut}
              className="ml-2 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-pink-900">
              Sign Out
             </button>
            </>
            :<div className='space-x-5'>
              <Link
              href="/login"
              className="inline-flex items-center justify-center whitespace-nowrap text-primary px-4 py-2 text-base font-medium hover:text-pink-900 hover:underline">
               Login
              </Link>
             <Link
              href="/signup"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-pink-900">
                Signup
              </Link>
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
                  {auth ? auth.name : ''}
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {navOptions.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
                      <div className='flex flex-row cursor-pointer'>
                      <item.icon className="h-6 w-6 flex-shrink-0 text-primary" aria-hidden="true" />
                      <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                      </div>
                    </Link>
                  ))} 
                </nav>
              </div>
            </div>
            <div className="space-y-6 py-6 px-5">
             
              <div>
                <button
                  onClick={signOut}
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-pink-900">
                  Sign out
                </button>
                
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
