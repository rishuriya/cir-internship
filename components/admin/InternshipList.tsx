import data from './Users.json';
import InternshipCard from "./InternshipCard";
import { useEffect } from 'react';

function InternshipList() {

  useEffect(()=>{
  
      fetch("/api/admin/allInternships",{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      }).then(async (res)=>{
        const resData=await res.json();
        console.log(resData);
      });
  },[])

  return (
    <>
      {
        data.map((user) => {
          if(!user.approved){
            return (
              <div  key={user.id}>
                <InternshipCard
                  user={user}
                />
              </div>
            )
          }
        })
      }
    </>
  )
}

export default InternshipList;
