import { useState } from 'react';

import InternshipCard from "./InternshipCard";
import { useEffect } from 'react';

function InternshipList() {

  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
      fetch("/api/admin/allInternships",{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      }).then(async(res)=>{
        const resData=await res.json();

        if(resData.success){
          setInternships([...resData.data]);
          console.log("ok",internships);
        } 
        
      });
  },[])

  useEffect(()=>{
    if(internships.length>0){
      setLoading(false);
    }
  },[internships])


  return (
    <>
      {(!loading )?(
        internships.map((user) => {
          if(!user.approved){
            return (
              <div  key={user.id}>
                <InternshipCard
                  internship={user}
                />
              </div>
            )
          }
        })
      ):(<>
      Loading...
      </>)
        
      }
    </>
  )
}

export default InternshipList;
