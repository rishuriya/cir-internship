import Image from "next/image";
import logo from '../public/img/amritaLogo.png'
import Link from "next/link";
import { useEffect } from "react";

export default function landingPage() {

    return (
        <div className="w-[100vw] h-[100vh] bg-no-repeat bg-[url('../public/img/setu-bg.jpg')] bg-cover">
            
            <div className="flex justify-between flex-col md:flex-row">
                <div className="m-5">
                    <Image src={logo} height={"140px"} width={"374px"} />
                    
                </div>
                <div className="border border-white py-2 px-3 hover:bg-slate-100/50 hover:shadow-lg  text-center m-10  ">
                    <h1 className="font-medium leading-text text-5xl tracking-wider text-primary" >Online Internship Registration Portal</h1>
                    <p className="" >Corporate & Industry Relations(CIR),Amritapuri</p>

                </div>
        
                <div className="flex space-x-8 m-5 items-start p-4 sm:justify-center  text-lg font-medium">
                    <Link href={"/"}><div className="border border-white py-2 px-3 rounded-md hover:underline hover:bg-slate-100/50 hover:shadow-lg cursor-pointer">Home</div></Link>
                    <Link href={"/login"}><div className="border border-white py-2 px-3 rounded-md hover:underline hover:bg-slate-100/50 hover:shadow-lg cursor-pointer">Login</div></Link>
                    <Link href={"/signup"}><div className="border border-white py-2 px-3 rounded-md hover:underline hover:bg-slate-100/50 hover:shadow-lg cursor-pointer">Sign up</div></Link>

                </div>
            </div>
        </div>
    )
}
