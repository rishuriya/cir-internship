import Image from "next/image";
import logo from '../public/img/amritaLogo.png'
import Link from "next/link";

export default function landingPage() {
    console.log(" ** Made by amFOSS 🤍 for Amrita **")
    return (
        <div className="w-[100vw] h-[100vh] bg-no-repeat bg-[url('../public/img/setu-bg.jpg')] bg-cover">
            
            <div className="flex justify-between flex-col md:flex-row">
                <div className="m-5">
                    <Image src={logo} height={"100px"} width={"268px"} />
                    
                </div>
                <div className="flex space-x-8 m-5 items-start p-4 sm:justify-center text-lg font-medium">
                    {/* <Link href={"/"}><div className="border border-white py-2 px-3 rounded-md hover:underline hover:bg-slate-100/50 hover:shadow-lg cursor-pointer truncate">Home</div></Link> */}
                    <Link href={"/login"}><div className="border border-white py-2 px-3 rounded-md hover:underline hover:bg-slate-100/50 hover:shadow-lg cursor-pointer truncate">Login</div></Link>
                    <Link href={"/signup"}><div className="border border-white py-2 px-3 rounded-md hover:underline hover:bg-slate-100/50 hover:shadow-lg cursor-pointer truncate">Sign up</div></Link>

                </div>
            </div>
            <div className="border border-white py-4 px-3 max-w-6xl bg-slate-100/50 hover:shadow-lg rounded-md text-center mx-auto my-12  ">
                    <h1 className="font-medium leading-text md:text-5xl text-xl tracking-wider text-primary" >Online Internship Registration Portal</h1>
                    <p className="my-5 text-base font-medium md:text-2xl" >Corporate & Industry Relations(CIR),Amritapuri</p>

                </div>
                {/* <div>
                        <img src="https://amfoss.in/branding/HORIZONTAL-TEXT-BULB-WHITE.svg" className="fixed bottom-8 right-10" alt="This CIR-Internship is made by amFOSS" width={200}  height={20}/>
                </div> */}
        </div>
    )
}
