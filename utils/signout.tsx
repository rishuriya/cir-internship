import Router from "next/router";
import cookie from 'js-cookie';

export const signout=()=>{
    cookie.remove("token");
    cookie.remove("id");
    cookie.remove("email");
    Router.push("/login");
}

