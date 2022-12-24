import Image from "next/image";
import logo from '../public/img/amritaLogo.png'
import Link from "next/link";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";

export default function landingPage() {
    const [open, setOpen] = useState(false);
    const navOptions = [
        {
          name: 'Login',
          description: 'Login',
          href: '/login',
        },
        {
          name: 'Sign Up',
          description: 'Register Internships',
          href: '/signup',
        },
        // {
        //   name: 'Approved Internships',
        //   description: "Connect with third",
        //   href: '/',
        //   icon: AiOutlineCheck,
        // },
       
      ]
    console.log(" ** Made by amFOSS 🤍 for Amrita ** ")
    return (
        <nav>
        <div className="w-[100vw] h-[100vh] bg-no-repeat bg-[url('../public/img/setu-bg.jpg')] bg-cover">
            
            <div className="flex justify-between flex-col md:flex-row mx-3 ">
                {/* <div className="text-3xl md:hidden absolute right-8 top-8 cursor-pointer" onClick={() => setOpen(!open)}>
                    {open ? <AiOutlineClose /> : <AiOutlineMenu />}
                </div> */}
                <div className="m-2 ">

                    <Image className="sm:height-50px md:height" src={logo} height={"85px"} width={"220px"} />
                </div>
                
                <div className="flex space-x-8 m-5 items-start p-4 md:text-lg text-sm font-medium md:visible ">
                    <Link href={"/login"}><div className="border border-white py-2 px-3 rounded-md hover:underline hover:bg-slate-100/50 hover:shadow-lg cursor-pointer md:20 truncate">Login</div></Link>
                    <Link href={"/signup"}><div className="border border-white py-2 px-3 rounded-md hover:underline hover:bg-slate-100/50 hover:shadow-lg cursor-pointer truncate">Sign up</div></Link>
                </div>

           
             {/* <ul className={`md:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4 duration-500 ${open ? "left-0" : "left-[-100%]"}`}></ul> */}
             {/* <ul className={`md:hidden bg-transparent fixed w-contain top-0 overflow-y-auto bottom-0 py-24 pl-4 duration-500 ${open ? "left-0" : "left-[-100%]"}`}>
                {
                    navOptions.map((option) => (
                        <Link href={option.href}>
                            <li className="border border-white py-2 px-3 rounded-md hover:underline hover:bg-slate-100/50 hover:shadow-lg cursor-pointer md:20 truncate">{option.name}</li>
                        </Link>
                    ))
                }
             </ul> */}
            {/* <div className="flex space-x-8 m-5 items-start p-4 md:text-lg text-sm font-medium md:visible invisible ">
            {
                navOptions.map((option) => (
                    <Link href={option.href}>
                        <div className="border border-white py-2 px-3 rounded-md hover:underline hover:bg-slate-100/50 hover:shadow-lg cursor-pointer md:20 truncate">{option.name}</div>
                    </Link>
                ))
            }
            </div> */}
            </div>
            <div className="border border-white py-4 px-3 max-w-6xl bg-slate-100/50 hover:shadow-lg rounded-md text-center mx-auto my-12">
                    <h1 className="font-medium leading-text md:text-5xl text-3xl tracking-wider text-primary" >Online Internship Registration Portal</h1>
                    <p className="my-5 sm:text-base md:text-xl font-medium" >Corporate & Industry Relations(CIR),Amritapuri</p>

                </div>
                {/* <div>
                        <img src="https://amfoss.in/branding/HORIZONTAL-TEXT-BULB-WHITE.svg" className="fixed bottom-8 right-10" alt="This CIR-Internship is made by amFOSS" width={200}  height={20}/>
                </div> */}
                {/* <Link href={"/"}><div className="border border-white py-2 px-3 rounded-md hover:underline hover:bg-slate-100/50 hover:shadow-lg cursor-pointer truncate">Home</div></Link> */}
        </div>
        </nav>
    )
}
