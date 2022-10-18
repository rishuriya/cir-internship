import { useState } from 'react';
import  {AiOutlineLoading3Quarters} from 'react-icons/ai'
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
        <div className='table max-w-5xl md:max-w-7xl '>
       <thead className=''>
       <tr>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Name
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Roll No.
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Duration
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Company
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Mode/Type
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Approval
          </th>
        </tr>
        </thead>
        <tbody className='divide-y-2'>
        {internships.map((user) => {
          if(!user.approved){
            return (
                <InternshipCard
                key={user.id}
                  internship={user}
                />
            )
          }
        })}

        </tbody>
        </div>
      ):(<>
      <AiOutlineLoading3Quarters className='fill-primary my-10 mx-auto animate-spin' size={42}/>
      </>)
        
      }
    </>
  )
}

export default InternshipList;
