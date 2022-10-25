import Image from "next/image";
import logo from '../public/img/amritaLogo.png'
import Link from "next/link";

export default function landingPage() {
    return (
        <div className="w-[100vw] h-[100vh] bg-landingPageBg">
            <div className="flex justify-between flex-col md:flex-row">
                <div className="m-5">
                    <Image src={logo} width={'500rem'} />
                </div>
                <div className="flex space-x-8 m-5 items-start p-4 sm:justify-center">
                    <button className="border border-white p-2 rounded-md">Home</button>
                    <button className="border border-white p-2 rounded-md">About</button>
                    <button className="border border-white p-2 rounded-md">Sign up</button>
                </div>
            </div>
        </div>
    )
}
