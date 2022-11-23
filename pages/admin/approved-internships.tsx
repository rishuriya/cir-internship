import React from 'react'
import Head from 'next/head'
import cookie from 'js-cookie';
import { useEffect } from 'react'
import { update } from '../../slices/userSlice'
import Router from "next/router";
import { getUser } from '../../utils/getUser'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store';
import Navbar from '../../components/admin/Navbar'
import InternshipApprovedList from '../../components/admin/ApprovedInternshipList'


function ApprovedInternships() {

  const dispatch = useDispatch();
  const authUser:any = useSelector((state: RootState) => state.user.value);

  useEffect(() => {
    if (authUser === null) {
      try {
        const token = cookie.get("token");
        getUser(token).then((response) => {
          //console.log(response)
          if (!response.isAuth) {
            Router.push("/login");
            return;
          }
          // console.log("welcome ",response.user.name)
          const userObj = {
            id: response.user.id,
            name: response.user.name,
            email: response.user.email,
            isAdmin: response.user.role === "Admin" ? true : false,
            token: token,
          }
          dispatch(update(userObj));
          if(!userObj.isAdmin){
            Router.push("/");
            return;
          }
          if (response.user.role === "admin") {
            Router.push("/admin");
            return;
          }
        
        if(token===undefined){
          Router.push("admin/login");
        }
      })
    } catch (err) {
      console.log(err);
      Router.push('/signup');
    }
   }
   else if(authUser!==null && !authUser.isAdmin){
    Router.push('/');
    return;
   }
  },[]
  )


  return (
    <div>
       <Head>
        <title>CIR Admin - Amrita Internship</title>
        <meta name="description" content="Amrita Students can submit their Internship detail and get approval from CIR online" />
        <link rel="icon" href="/favicon.ico" />
      </Head> 

      <main>
      <Navbar/>
        <div className='mx-auto max-w-7xl px-4 sm:px-6'>
            <div className='my-3 mx-2 font-semibold text-lg text-center'>
                Admin Portal
            </div>
            <div className='font-medium mx-5 my-5 text-xl'>
            Internships
            </div>
            <InternshipApprovedList/>
        </div>
      </main>
    </div>
  )
}

export default ApprovedInternships
