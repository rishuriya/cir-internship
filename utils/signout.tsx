import Router from "next/router";
import cookie from 'js-cookie';
import { useDispatch } from 'react-redux'
import { unsetUser } from '../slices/userSlice'


const signout=()=>{
    
    cookie.remove("token");
    // const dispatch = useDispatch();
    // dispatch(unsetUser());
    Router.push("/login");
     


}

export default signout;
