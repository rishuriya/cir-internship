import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import Router from "next/router";
import cookie from 'js-cookie';
import { getUser } from './getUser'
import { update } from '../slices/userSlice'



const setUser=async()=>{
  const dispatch = useDispatch();
  const authUser:any = useSelector((state: RootState) => state.user.value);

  if(authUser===null){
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
        if(userObj.isAdmin){
          Router.push("/admin");
          return;
        }
        if (response.user.role === "admin") {
          Router.push("/admin");
          return;
        }
      });

    } catch (err) {
      console.log(err);
      Router.push('/signup');
    }
  }
  else{
    if(authUser.isAdmin){
      Router.push('/admin');
      return;
    }
  }
}

export default setUser