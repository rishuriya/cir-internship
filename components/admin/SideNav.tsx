import React from 'react';
import Link from 'next/link';
import cookie from 'js-cookie'; 
import Router from "next/router";
import { useRouter } from "next/router";
import { RootState } from '../../store';
import { unsetUser } from '../../slices/userSlice'
import { useSelector,useDispatch } from 'react-redux'
import { Fragment, useEffect, useState } from 'react'
import {AiOutlineFileAdd,AiFillHome,AiOutlineMenu,AiOutlineClose,AiOutlineUserAdd,AiOutlineHome,AiOutlineFileDone,AiOutlineFilePpt, AiOutlineSetting} from 'react-icons/ai';

const navOptions = [
  {
    name: 'Home',
    description: 'Admin Internship view Dashboard',
    href: '/admin',
    icon: AiFillHome,
  },
  {
    name: 'Approved internships',
    description: 'See all approved Internships',
    href: '/admin/approved-internships',
    icon: AiOutlineFileAdd,
  },
  {
    name: 'Add Admin',
    description: "Add Admins who can approve Students Internships",
    href: '/admin/signup',
    icon: AiOutlineUserAdd,
  },
 
]


export default function Navbar() {

  const authUser = useSelector((state: RootState) => state.user.value)
  const [auth, setAuth] = useState(null)
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  

  useEffect(() => {
    setAuth(authUser);
  })

  const dispatch = useDispatch();
  const signOut=async()=>{
    if (await confirm("Are you sure you want to sign out?") == false) {
      return;
    }
    cookie.remove("token");
    dispatch(unsetUser());
    Router.push("/login");
  }

  const inActive= "py-2 my-1 px-3 font-medium text-gray-900 hover:text-black hover:bg-slate-400/70 hover:shadow-sm border-2 border-slate-300/30 rounded-lg cursor-pointer bg-slate-300/40 flex flex-row items-center";
  const active  = "py-2 my-1 px-3 font-medium text-black hover:text-gray-900 border-2 border-primary shadow-sm rounded-lg cursor-pointer bg-pink-100/70 flex flex-row ";

  return (
    <>
    <nav className="right-auto w-[18vw] hidden lg:block fixed bg-slate-300 inset-0 pb-10 px-4 overflow-y-auto shadow-lg">
    <div className='flex md:flex-col'>
     <div className="justify-start md:my-4 md:flex-1 mx-auto">
        <Link href="/admin">
          <img
            className="h-10 w-auto sm:h-16"
            src="https://upload.wikimedia.org/wikipedia/en/f/f8/Amrita-vishwa-vidyapeetham-color-logo.png"
            alt=""
          />
        </Link>
      </div>

      <div className="flex-col hidden md:mt-10 space-y-5 md:space-y-8 md:flex scale-90 ">
        <Link href="/admin">
            <div className={router.pathname=="/admin" ?active:inActive}>
              <AiOutlineHome size={24} className="mx-2"/>
                Dashboard
            </div>
        </Link>
        <Link href="/admin/approved-internships">
            <div className={router.pathname=="/admin/approved-internships" ?active:inActive}>
            <AiOutlineFileDone size={24} className="mx-2"/>
            Approved Internships
            </div>
        </Link>
        <Link href="/admin/pending-verification">
            <div className={router.pathname=="/admin/pending-verification" ?active:inActive}>
            <AiOutlineFilePpt size={24} className="mx-2"/>
            Pending Verification
            </div>
        </Link>
        <Link href="/admin/settings" className='border-2 border-primary'>
            <div className={router.pathname=="/admin/settings" ?active:inActive}>
            <AiOutlineSetting size={24} className="mx-2"/>
            Settings
          </div>
        </Link>
        <Link href="/admin/signup" className='border-2 border-primary'>
            <div className={router.pathname=="/admin/signup" ?active:inActive}>
            <AiOutlineUserAdd size={24} className="mx-2"/>
            Add Admin
          </div>
        </Link>
      </div>
      <div className='absolute bottom-0  '>
      {auth?
          <>
          <div className='truncate w-[15vw] py-1 px-3 text-lg bg-gray-50/90 border-2 border-slate-500 rounded-xl mb-4'>
            {auth.name}
          </div>
         <button
          onClick={signOut}
          className="w-full mb-2 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-pink-900">
          Sign Out
         </button>
        </>
        :<div className='space-y-5 my-auto'>
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
    </nav>

    {/* ---Mobile View--- */}
    <nav className='sticky top-0 z-10 border-b-2 bg-white pl-1 pt-1 text-gray-700 sm:pl-3 sm:pt-3 lg:hidden'>
      <div>{
        drawerOpen?
        <div className='right-auto w-full fixed bg-slate-200 inset-0 pb-10 px-4 overflow-y-auto shadow-lg'>
        <button className='m-2 p-2 inline-flex border-2 border-gray-600 rounded-lg my-4' onClick={()=>setDrawerOpen(false)}>
        <AiOutlineClose size={26} className="mx-2 "/>
        </button>

        <div className="flex-col lg:hidden md:mt-10 space-y-5 md:space-y-8  scale-90 ">
          <Link href="/admin">
              <div className={router.pathname=="/admin" ?active:inActive}>
                <AiOutlineHome size={24} className="mx-2"/>
                  Dashboard
              </div>
          </Link>
          <Link href="/admin/approved-internships">
              <div className={router.pathname=="/admin/approved-internships" ?active:inActive}>
              <AiOutlineFileDone size={24} className="mx-2"/>
              Approved Internships
              </div>
          </Link>
          <Link href="/admin/pending-verification">
              <div className={router.pathname=="/admin/pending-verification" ?active:inActive}>
              <AiOutlineFilePpt size={24} className="mx-2"/>
              Pending Verification
              </div>
          </Link>
        </div>
        <div className='absolute bottom-0  '>
        {auth?
            <div className='mx-auto'>
            <div className='truncate w-56 mx-auto py-1 px-3 text-lg bg-gray-50/90 border-2 border-slate-300 rounded-xl mb-4'>
              {auth.name}
            </div>
          <button
            onClick={signOut}
            className="w-full mb-2 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-pink-900">
            Sign Out
          </button>
          </div>
          :<div className='space-y-5 my-auto'>
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
        :
        <button onClick={()=>setDrawerOpen(true)} className="m-2 p-2 border-2 border-slate-600 text-gray-600 rounded-lg">
           <AiOutlineMenu size={26} className="mx-2"/>
          </button>}
      </div>
    </nav>
    </>
  )
}


