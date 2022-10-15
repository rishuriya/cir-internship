import Head from 'next/head'
import cookie from 'js-cookie';
import { useEffect } from 'react'
import Router from "next/router";
import type { NextPage } from 'next'
import { update } from '../slices/userSlice'
import { getUser } from '../utils/getUser'
import HomePage from '../components/Home';
import { useSelector, useDispatch } from 'react-redux'

const Home: NextPage = () => {


  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const token = cookie.get("token");
      getUser(token).then((response) => {
        console.log(response)
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
        if (response.user.role === "admin") {
          Router.push("/admin");
          return;
        }
      });

    } catch (err) {
      console.log(err);
      Router.push('/signup');
    }

  }, []
  )


  return (
    <div className="">
      <Head>
        <title>Amrita Internship - CIR</title>
        <meta name="description" content="Amrita Students can submit their Internship detail and get approval from CIR online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <HomePage />
      </div>

    </div>
  )
}

export default Home
