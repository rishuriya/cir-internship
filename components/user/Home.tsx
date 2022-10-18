import React, { useEffect } from 'react'
import NoInternship from './NoInternship';
import Navbar from './Navbar';
import InternshipCard from './InternshipCard';
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import { useSelector } from 'react-redux';
import { RootState } from '../../store'


function Home() {

  const [loading, setLoading] = React.useState(true);
  const [internship_id, setInternship_id] = React.useState([]);

  const authUser: any = useSelector((state: RootState) => state.user.value);
  
  useEffect(()=>{
    if(authUser!==null){

      const userObject={
        _id:authUser.id
      }
      fetch(`/api/student/userData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf8 ",
        },
        body: JSON.stringify(userObject),
      })
      .then((res)=>res.json())
      .then((data)=>{
        if(data.success){
          console.log(data);
          setInternship_id(data.data.internships);
          setLoading(false);
          console.log("internship_id",internship_id);
        }
      })
    }
  },[authUser])
  

  return (
    <div>
    <Navbar />

    <main className="mx-auto max-w-7xl px-4 sm:px-6">
      {loading?<AiOutlineLoading3Quarters className='fill-primary animate-spin my-14 mx-auto' size={48}/>
      : internship_id.map((id)=>{
        return(
        <InternshipCard key={id} id={id} />
      )
    }
      )}
     {/* <NoInternship/> */}

      {/* <InternshipCard date={"Oct 27th, 2022"} status={"Pending"} company={"Google"} duration={"29th Feb to 31st Feb 2023"} mode={"offline"} place={"Bangalore, India"} remarks={"Awaiting approval"} />

      <InternshipCard date={"Nov 3rd, 2022"} status={"Approved"} company={"Repl.ai"} duration={"29th Dec to 31st Dec 2023"} mode={"offline"} place={"Mumbai, India"} remarks={"Approved and verified"} />

      <InternshipCard date={"Dec 7th, 2022"} status={"Disapproved"} company={"Alpha Software"} duration={"29th Jan to 31st Jan 2023"} mode={"offline"} place={"Hydrebad, India"} remarks={"Disapproved, proof not provided"} /> */}
    </main>

    <footer className="">
    </footer>
    </div>
  )
}

export default Home