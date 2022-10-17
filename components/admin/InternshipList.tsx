import { useState } from 'react';
import data from './Users.json';
import InternshipCard from "./InternshipCard";
import { useEffect } from 'react';

function InternshipList() {

  const [internships, setInternships] = useState(null);
  // const [student,setStudent]=useState(null);


  useEffect(()=>{
      fetch("/api/admin/allInternships",{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      }).then(async(res)=>{
        const resData=await res.json();
    
        setInternships(resData.data);
        console.log("ok",internships);
      });
  },[])


  // const fetchUser=(id)=>{
  //   const userObject={
  //     _id:id
  //   }
  //   fetch("/api/student/userData",{
  //     method:"GET",
  //     headers:{
  //       "Content-Type":"application/json"
  //     },
  //     body: JSON.stringify(userObject),
  //   }).then(async (res)=>{
  //     const resData=await res.json();
  //     console.log(resData);
  //     return resData.data
  //   });
  // }

  return (
    <>
        {console.log(internships)}
      {(internships!==null )?(
        data.map((user) => {
          if(!user.approved){
            return (
              <div  key={user.id}>
                <InternshipCard
                  internships={internships}
                  // student={fetchUser(user.user)}
                />
              </div>
            )
          }
        })
      ):(<>
      no idea
      </>)
        
      }
    </>
  )
}

export default InternshipList;
