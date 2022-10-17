import React from "react";
import Link from "next/link";
import cookie from "js-cookie";
import Router from "next/router";
import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { update } from '../../slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { MdReportGmailerrorred } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function login() {
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
    console.log(user)
      if(user!=null){
        Router.push("/admin");
      }
   },[user]
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
      console.log(resData);
      if (res.status === 200 && resData.success) {
        const userObj={
          name: resData.user.name,
          email: resData.user.email,
          isAdmin: resData.user.isAdmin,
          token: resData.token,
        }
        dispatch(update(userObj));
        cookie.set("token", resData.token);
        // cookie.set("id", resData.user._id);
        // cookie.set("email", resData.user.email);
        if(resData.user.isAdmin){
          Router.push("/admin");
        }else{
          Router.push("/");
        }
      } 
      setLoading(false);
      
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  return (

    <div className="bg-secondary h-screen w-full relative p-2 " style={{backgroundImage: "url('/img/register_bg_2.png')",}}>

      <form
      onSubmit={handleOnSubmit}
      >
      <div className="max-w-xl min-w-fit mx-auto mt-24 py-10 flex flex-col bg-slate-300/40 z-10 shadow-xl rounded-lg items-center">
        <a href="/" className="mx-3 my-auto text-primary ">
          {/* <Image src={} height="55" width="210"></Image> */}
        </a>
        
          <h1 className="text-3xl my-5 font-bold ">Login</h1>

          <div className="my-3 mx-3">
            <div className="mx-2 font-medium">Email</div>
            <input
              className=" border-2 border-primaryDark rounded-xl px-3 py-2 invalid:border-red-500"
              name="email"
              placeholder="Email"
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
            <Link href="/admin/signup">
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

         <Link href={"../login"}>
            <div className="hover:underline text-blue-500 cursor-pointer font-medium mt-6">
            Student Login
            </div>
        </Link> 

      </div>
      </form>
    </div>
  );
}

export default login;
