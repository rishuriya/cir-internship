import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import cookie from 'js-cookie';
import { useEffect } from 'react'
import { update } from '../../slices/userSlice'
import Router from "next/router";
import { getUser } from '../../utils/getUser'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store';
import AdminHome from '../../components/admin/Home';


function Index() {

  const dispatch = useDispatch();
  const authUser:any = useSelector((state: RootState) => state.user.value);

  // const admin = cookie.get("token");

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
        <AdminHome/>
      </main>
    </div>
  )
}

export default Index
