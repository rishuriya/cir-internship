import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Router from "next/router";
import { useSelector, useDispatch } from 'react-redux'
import { update } from '../../slices/userSlice'
import { ImSpinner2 } from "react-icons/im";
import { MdReportGmailerrorred } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import cookie from "js-cookie";

function Signup() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch()

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const handleOnSubmit = async(e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      if (passwordInput.length < 6) {
        throw "Password should be atleast 6 characters long!";
      }
      
      const data = Object.fromEntries(new FormData(e.target).entries());
      
      const bodyObject={
        name: data.name,
        email: data.email,
        password: data.password,
        role: "Admin",
      };

      const res = await fetch("../api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf8 ",
        },
        body: JSON.stringify(bodyObject),
      });
      const resData = await res.json();

      if (res.status === 200 && resData.success) {
        const userObj={
          name: resData.user.name,
          email: resData.user.email,
          isAdmin: true,
          token: resData.token,
        }
        dispatch(update(userObj));
        cookie.set("token", resData.token);
        // cookie.set("id", resData.user._id);
        // cookie.set("email", resData.user.email);
        Router.push("/admin");
      } else {
        throw "Something went wrong!";
      }
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  return (
    <div className="bg-secondary h-screen w-full relative p-2">

      <form
      // action="/api/auth/signup"
      method="POST"
      onSubmit={handleOnSubmit}
      >
      <div className="max-w-xl min-w-fit mx-auto mt-24 py-10 flex flex-col bg-slate-300/40 z-10 shadow-xl rounded-lg items-center">
        <Link href="/" className="mx-3 my-auto text-primary ">
          {/* <Image src={} height="55" width="210"></Image> */}
        </Link>
        
          <h1 className="text-3xl my-5 font-bold ">Signup</h1>

          <div className="my-3 mx-3">
            <div className="mx-2 font-medium">Full Name</div>
            <input
              className=" border-2 border-primaryDark rounded-xl px-3 py-2 invalid:border-red-500"
              name="name"
              placeholder="Full Name"
              onChange={(e) => setNameInput(e.target.value)}
              type="text"
              required
            />
          </div>

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
                <React.Fragment>
                  <AiFillEye size={26} />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <AiFillEyeInvisible size={26} />
                </React.Fragment>
              )}
            </div>
          </div>
          <input type="hidden" name="role" value="Admin"/>

          <div className="my-3 mx-10">
            Already have an account?{" "}
            <Link href="/login">
              <span className="text-blue-500 hover:underline cursor-pointer">
                Login
              </span>
            </Link>
          </div>

          {!loading ? (
            <button
              className=" px-5 py-3 my-2 bg-primary font-semibold text-lg hover:bg-pink-900 active:scale-95 rounded-lg text-white"
              type="submit">
              Signup
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
      </div>
      </form>
    </div>
  );
}

export default Signup;