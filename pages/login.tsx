import React from "react";
import Link from "next/link";
import cookie from "js-cookie";
import { useState } from "react";
import Router from "next/router";
import { RootState } from '../store'
import { ImSpinner2 } from "react-icons/im";
import { update } from '../slices/userSlice';
import { MdReportGmailerrorred } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Login() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch()
  const user = cookie.get("token");
  React.useEffect(() => {
    if(user!=undefined){
      Router.push("/user");
    }
   },[]
  )
  const handleOnSubmit = async(e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      if (passwordInput.length < 6) {
        throw "Password should be atleast 6 characters long!";
      }
      const data = Object.fromEntries(new FormData(e.target).entries());
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      const resData = await res.json();
      
      if (res.status === 200 && resData.success) {
        const userObj={
          id:resData.user._id,
          name: resData.user.name,
          email: resData.user.email,
          isAdmin: resData.user.role === "Admin" ? true : false,
          token: resData.token,
        }
        dispatch(update(userObj));
        setLoading(false);
        if(resData.user.role=="Student"){
          cookie.set("token", resData.token);
          //console.log("Admin bduub");
          Router.push("/user");
        }else{
          // Router.push("/signup");
          throw "Something went wrong!";
        }
      } 
      else{
          // Router.push("/signup");
          if(res.status===400){
            throw resData.message;
          }
          throw "Something went wrong!";
        }
      
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  return (

    <div className="bg-secondary h-screen w-full relative p-2 bg-[url('/img/register_bg_2.png')]">

      <form
      onSubmit={handleOnSubmit}
      >
      <div className="max-w-xl min-w-fit mx-auto mt-24 py-10 flex flex-col bg-slate-300/40 z-10 shadow-xl rounded-lg items-center">
        
        
          <h1 className="text-3xl my-5 font-bold ">Login</h1>

          <div className="my-3 mx-3">
            <div className="mx-2 font-medium">Email</div>
            <input
              className=" border-2 border-primaryDark rounded-xl px-3 py-2 invalid:border-red-500"
              name="email"
              placeholder="abc@am.students.amrita.edu"
              onChange={(e) => setEmailInput(e.target.value)}
              type="email"
              required
            />
          </div>

          <div className="relative my-3 mx-3">
            <div className=" mx-2 font-medium ">Password</div>
            <input
              type={showPassword ? "text" : "password"}
              className="peer border-2 border-primaryDark rounded-xl px-3 py-2 focus:border-cyan-500 focus:outline-none focus:shadow-xl invalid:border-red-500"
              name="password"
              placeholder="Password"
              onChange={(e) => setPasswordInput(e.target.value)}
              required
            />
            <div
              className="absolute peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-8 top-8 right-4 z-20 cursor-pointer"
              onClick={showPasswordHandler}>
              {showPassword ? (
                <AiFillEye size={26} />
              ) : (
                <AiFillEyeInvisible size={26} />
              )}
            </div>
          </div>

          <button
            onClick={() => alert("Help comming soon!!")}
            className="text-blue-500 my-1 hover:underline">
            Forgot password?
          </button>

          <div className="my-3 mx-10">
            New here?{" "}
            <Link href="/signup">
              <span className="text-blue-500 hover:underline cursor-pointer">
                Signup
              </span>
            </Link>
          </div>

          {!loading ? (
            <button
              className=" px-5 py-3 my-2 bg-primary font-semibold text-lg hover:bg-pink-900 active:scale-95 rounded-lg text-white"
              type="submit">
              Login
            </button>
          ) : (
            <>
              <ImSpinner2
                className="animate-spin my-3 fill-primary"
                size={30}
              />
            </>
          )}

          {error !== "" ? (
            <div className="flex bg-red-300/40  border-l-2 border-red-700 my-1 flex-row items-center">
              <MdReportGmailerrorred size={28} className="fill-red-700" />
              <p className="text-red-700 mx-3 my-2 font-medium">{error}</p>
            </div>
          ) : (
            <></>
          )}

         <Link href={"admin/login"}>
            <div className="hover:underline text-blue-500 cursor-pointer font-medium mt-6">
            Admin Login
            </div>
        </Link> 

      </div>
      </form>
    </div>
  );
}

export default Login;
