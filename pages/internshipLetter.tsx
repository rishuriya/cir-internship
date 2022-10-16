import React from 'react'
import { useState } from 'react';
import { useRouter } from "next/router";
import cookie from 'js-cookie';
import { getUser } from '../utils/getUser'
import { useEffect } from 'react'
function internshipLetter() {
    const router = useRouter()
    let internship_id=router.query.id;
    let user;
    let user_name
    let internshipdata
    const [data, setData] = useState(false);
    useEffect(() => {
      try{
        const token = cookie.get("token");
        if(data==false){
        getUser(token).then(async(response) => {
            user=response.user["id"];
            user_name= response.user
            if(user_name!=undefined)
            setData(true);
            const bodyObject={
              user: user,
              _id: internship_id
          };
          console.log(bodyObject);
            const res = await fetch("/api/student/internship", {
              method: "POST",
              headers: {
                "Content-Type": "application/json; charset=utf8 ",
              },
              body: JSON.stringify(bodyObject),
            });

            await res.json().then((resData)=>{
            internshipdata=resData.data;
      
            //console.log(internshipdata._id);

            });
            console.log(user)
            console.log("useEffect")
        });
      }
        
      }catch(err){
        console.log("hello");
      }
      },[data]);
      
      if(data==true){
  return (
    
    
    <div className='mx-auto max-w-5xl px-4 sm:px-8 my-10' style={{ display: data ? 'block' : 'none' }}>
        <div>
            <p>To,</p>
            <p>The Principle,</p>
        </div>
        <div className='my-5'>
            <p>Amrita Vishwa Vidyapeetham</p>
            <p>Amritapuri, Kollam, Kerala</p>
        </div>
        <div className='my-5'>
            <p>Subject: Regarding approval to join internship.</p>
        </div>
        <div className='my-5'>
            <p>Respected Sir/Madam,</p>
        </div>
        <div className='my-5'>
            <p className='indent-8'>I am  {user!=null?user["branch"]:""} student of {user!=null?user["year_of_joining"]:""} batch currently studying in {user!=null?user["semester"]:""}.
             I applied for the Internship program in the resdata.Incompany_Name for internship_type and I got selected for program.</p>
             <p className='my-3'>I request you to give me permission to join the internship which is starting on start_date and ending on End_date.</p>
        </div>
        <div className='flex flex-row justify-between mx-3 items-end'>
            <div>
                <p>Thanking You,</p>
                <p>Yours truly,</p>
                <p>name</p>
                <p>Signature</p>
            </div>
            <div>
               
                <p className='mb-2'>Advisor signature</p>
            </div>
            <div>
                <p className='mb-2'>HOD signature</p>
            </div>

        </div>
      
    </div>
  

  )
      }
}
export default internshipLetter