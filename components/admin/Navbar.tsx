import React, { useEffect } from 'react'
import cookie from "js-cookie";
import Router from "next/router";
import { RootState } from '../../store';
import { unsetUser } from '../../slices/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import { useRouter } from 'next/router';


export default function Navbar() {

    const dispatch = useDispatch();

    const authUser = useSelector((state: RootState) => state.user.value)
    const [auth, setAuth] = useState(null)

    useEffect(() => {
        console.log(authUser)
        setAuth(authUser);
    },)


    const signOut = async () => {
        if (await confirm("Want to sign out?") == false) {
            return;
        }
        cookie.remove("token");
        dispatch(unsetUser());
        Router.push("/login");
    }

    return (
        <>
            <div className='flex'>
            {/* <div className='max-w-7xl px-4 sm:px-6 lg:w-[80vw] lg:mx-auto '>
            <div className='my-3 mx-2 font-semibold text-2xl text-center'> */}
                <div className='max-w-7xl px-4 sm:px-6 lg:w-[80vw] lg:mx-auto'>
                    <div className='my-3 mx-2 flex justify-end font-semibold text-right'>
                        {
                            auth ?
                            <>
                                <h3 className='bg-gray-100 p-2 rounded-md mr-5'>{auth.name}</h3>
                            </>
                            :
                            <div className='mr-2'>Loading...</div>
                        }
                        <button onClick={signOut} className='bg-red-600 text-white p-2 rounded-md'>Sign out</button>
                    </div>
                </div>
            </div>
        </>
    )
}
