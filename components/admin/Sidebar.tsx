import React from 'react'
import { AiOutlineHome, AiOutlineClockCircle } from 'react-icons/ai'
import { IoShieldCheckmarkSharp } from 'react-icons/io5'
import { GiPerpendicularRings } from 'react-icons/gi'
import { GrSettingsOption } from 'react-icons/gr'
// import {GrUserAdmin} from 'react-icons/gr'
import { MdOutlinePersonAddAlt1 } from 'react-icons/md'
import Link from 'next/link'

export default function Sidebar() {
    return (
        <div className='fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-gray-900 text-white shadow-lg justify-center'>
            <Link href="/admin">
            <div>
                <SidebarIcon icon={<AiOutlineHome size={28} className="mx-2" />} text={'Dashboard'} />
            </div>
            </Link>

            <Link href="/admin/approved-internships">
            <div>
                <SidebarIcon icon={<IoShieldCheckmarkSharp size={28} className="mx-2" />} text={'Approved Internships'} />
            </div>
            </Link>

            <Link href="/admin/pending-verification">
            <div>
                <SidebarIcon icon={<AiOutlineClockCircle size={28} className="mx-2" />} text={'Pending Verification'} />
            </div>
            </Link>

            <Link href="/admin/settings">
            <div>
                <SidebarIcon icon={<GiPerpendicularRings size={28} className="mx-2" />} text={'Settings'} />
            </div>
            </Link>

            <Link href="/admin/signup">
            <div>
                <SidebarIcon icon={<MdOutlinePersonAddAlt1 size={28} className="mx-2" />} text={'Add Admin'} />
            </div>
            </Link>
        </div>
    )
}


const SidebarIcon = ({ icon, text }) => (
    <div className="sidebar-icon group">
        {icon}

        {/* i want a span tag displaying the prop text when an icon is hovered on */}

        <span className="sidebar-tooltip group-hover:scale-100">
            {text}
        </span>

    </div>
)