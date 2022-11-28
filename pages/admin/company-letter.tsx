// import Link from 'next/link';
// import cookie from 'js-cookie';
// import { useState } from 'react';
// import { useEffect } from 'react';
// import React,{useRef} from 'react';
// import { useRouter } from "next/router";
// import { getUser } from '../../utils/getUser'
// import ReactToPrint from "react-to-print";


// const CompanyLetter= React.forwardRef<HTMLDivElement>(function InternshipLetter(prop,ref){
//   const router = useRouter()
//   let internship_id=router.query.id;
//   //console.log(internship_id);
//     let user;
//     let user_name
//     let internship_data
//     const [isDataRecieved, setIsDataRecieved] = useState(false);
//     const [data, setData] = useState(false);
//     const [username,setUserName]=useState([]);
//     const [internshipdata,setInternshipData]=useState([]);

//     useEffect(() => {
//       try{
//         const token = cookie.get("token");
//         getUser(token).then(async(response) => {
//             user=response.user["id"];
//             const userObject={
//               _id:user
//             }
//             fetch(`../api/student/${user}`, {
//               method: "GET",
//               headers: {
//                 "Content-Type": "application/json; charset=utf8 ",
//               },
//             }).then(async (res) => {
//               const resData=await res.json()
//             user_name= resData.data 
//             if(user_name)
//             {
//               setUserName(user_name);
//               setData(true);
//             }       
//           });
//         });
//           if(username){
//             const bodyObject={
//               user: username["_id"],
//               _id: internship_id
//             }
//             //console.log(bodyObject);
//             fetch("../api/student/internship", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json; charset=utf8 ",
//               },
//               body: JSON.stringify(bodyObject),
//             }).then(async (res) => {
//               const resData=await res.json()
//             internship_data=resData.data;
//             if(internship_data)
//             {
//             setInternshipData(internship_data);
//             setIsDataRecieved(true);
//             }
//             });

//           }
//             //console.log(internshipdata._id);
            
      
//             // if(resData.success){
//             //   setIsDataRecieved(true);
//             //   router.push("/")
//             // }
//       }catch(err){
//         console.log(err);
//       }
//       },[isDataRecieved, data]);
//   if(isDataRecieved && data){
//     //console.log(internshipdata);
//   return (
//     <div>
//     <div className='mx-auto max-w-5xl px-4 sm:px-8 my-32' ref={ref}>
//         <div>
//             <p>To,</p>
//             <p>The Principal,</p>
//         </div>
//         <div className='my-5'>
//             <p>{username["school"]},</p>
//             <p>Amrita Vishwa Vidyapeetham,</p>
//             <p>Amritapuri, Kollam, Kerala</p>
//         </div>
//         <div className='my-5'>
//             <p>Subject: Regarding approval to join internship.</p>
//         </div>
//         <div className='my-5'>
//             <p>Respected Sir/Madam,</p>
//         </div>
//         <div className='my-5 mx-2'>
//             <p className='indent-8'>I am {username["name"]} of {username["course"]} {username["branch"]} student of {username["year_of_joining"]} batch currently studying in S{username["semester"]} .
//              I applied for the Internship program in the {internshipdata["company_name"]} for {internshipdata["training_type"]} and I got selected for program.</p>
//              <p className='my-3'>I request you to give me permission to join the internship which is starting on {internshipdata["internship_start_date"].substring(0,10)} and ending on {internshipdata["internship_end_date"].substring(0,10)}.</p>
//         </div>
//         <div className='flex flex-row justify-between mx-3 items-end my-14'>
//             <div>
//                 <p>Thanking You,</p>
//                 <p>Yours truly,</p>
//                 <p>{username["name"]}</p>
//                 <p>{username["rollno"]}</p>
//                 <p>Signature</p>
//             </div>
//             <div>
               
//                 <p className=''>Advisor signature</p>
//             </div>
//             <div>
//                 <p className=' mr-10'>HOD signature</p>
//             </div>
//         </div>
//   </div>
// </div>

//   );}
// })


// function PrintLetter() {
//     let componentRef;
//       componentRef = useRef();
//     return (
//       <div>
//         <CompanyLetter ref={el => (componentRef = el)} />
//         <div className="mx-auto max-w-5xl px-4 sm:px-8 my-10">
//         <ReactToPrint
//           trigger={() => <a className="px-6 py-3 text-blue-50 no-underline bg-blue-500 rounded hover:bg-blue-600 hover:underline hover:text-blue-200" href="#">Download</a>}
//           content={() => componentRef}
//         />
//           <Link href="/user">
//         <button className='px-6 py-2 mx-4 text-blue-50 no-underline bg-blue-500 rounded hover:bg-blue-600 hover:underline hover:text-blue-200'>
//             Back
//         </button>
//             </Link>
//         </div>
//       </div>
//     );
  
// }
// export default PrintLetter


export default function Letter(){
    return (
        <div className="mx-auto max-w-5xl">
            <div className="my-12 text-sm">
            11/25/22, 6:39 PM 
            </div>
            <div className="mt-24 mb-5 text-center">
            Aum Amriteswaryai Namah
            </div>
            <p className="my-10 text-right mr-10">
            25-11-2022
            </p>
        <div className='px-4 sm:px-8 mt-14 mb-5' >
            <div className='my-5'>
                <p>Company Name</p>
                <p>Designation</p>
                <p>Company Address</p>
            </div>
            <div className='my-5 font-medium'>
                <p>Subject:- Request for Internship for B.Tech student.</p>
            </div>
            <div className='my-5'>
                <p>Respected Sir/Madam,</p>
            </div>
            <div className='my-5 mx-2'>
            Amrita School of Engineering (ASE) is one of the several professional institutions under Amrita Vishwa
            Vidyapeetham, established under section 3 of the UGC Act, 1956. Engineering (B.Tech) students
            studying in ASE are advised to do Internship in reputed organizations. This will give them some practical
            experience which will contribute substantially to their learning process
            </div>
            <div className='flex flex-row justify-between mx-3 items-end my-14'>
                <div>
                    <p>Thanking You,</p>
                    <p>Yours truly,</p>
                    <p>username[name]</p>
                    <p>username[rollno]</p>
                    <p>Signature</p>
                </div>
                <div>
                   
                    <p className=''>Advisor signature</p>
                </div>
                <div>
                    <p className=' mr-10'>HOD signature</p>
                </div>
            </div>
      </div>
    </div>
    
      );
}