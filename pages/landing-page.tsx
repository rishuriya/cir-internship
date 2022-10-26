import Image from "next/image";
import logo from '../public/img/amritaLogo.png'
import Link from "next/link";

export default function landingPage() {
    return (
        <div className="w-[100vw] h-[100vh] bg-no-repeat bg-[url('http://vidya.amrita.ac.in/temp/registration/css/images/sethu.jpg')] bg-cover">
            <div className="flex justify-between flex-col md:flex-row">
                <div className="m-5">
                    <Image src={logo} height={"140px"} width={"374px"} />
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
