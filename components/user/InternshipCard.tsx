import Link from "next/link";
import { useEffect,useState } from "react";
import {AiOutlineDownload, AiOutlineUpload} from 'react-icons/ai'
import {FiAlertTriangle} from 'react-icons/fi'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/router";
export default function InternshipCard({id}) {

    const [internship, setInternship] = useState([]);
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);
    const router = useRouter();
    let fileimg
    useEffect(()=>{
        fetch(`../api/internship/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json; charset=utf8 ",
              }              
            }).then(async (res) => {
                const resData=await res.json()
                let internship_data=resData.data;
                if(internship_data){
                    setInternship(internship_data);
                }
                setLoading(false);
            });
    },[])

    function handleletter(e, uid,approve){
        console.log(approve)
        if(approve!="Disapproved"){
                router.push({
                    pathname: '/user/internshipLetter',
                    query: { id: uid },
                 },"/user/internshipLetter")
                }
                else{
                    throw "Not Approved"
                }
        return;
    }
    const handleUpload= async(e)=>{
        //console.log(e.target.files)
        if (e.target.files && e.target.files[0]) {
            const i = e.target.files[0];
            fileimg=i;
            setImage(e.target.files[0]);
            //console.log(fileimg)
          }
        if(fileimg!=undefined){
            console.log(fileimg)
            const body = new FormData();
            body.append("file", fileimg);
            body.append("id", id);
            fetch("/api/student/hod_file", {
            method: "POST",
            body
          }).then(async (response) => {
           const fileres = await response.json();
           const bodyObject={
            _id:internship["_id"],
            hod_letter: fileres.url,
            approved:"Pending"
           }
           fetch("/api/admin/admin_decision", {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf8 ",
            },
            body: JSON.stringify(bodyObject),
          }).then(async (res) => {
          const resData = await res.json();
          if(resData.success){
            window.location.reload();
          }
          else{
            console.log(resData.error);
          }
        });
        });
    }
        
    }

    const handleStatus=(status)=>{
        if(status=="Incomplete"){
            return (
                <p id="status" className="px-3 py-1 text-sm font-bold text-blue-500 bg-blue-100 rounded">Incomplete</p> 
            )
        }
        else if(status=="Approved"){
            return (
                <p id="status" className="px-3 py-1 text-sm font-bold text-green-500 bg-green-100 rounded">Approved</p> 
            )
        }
        else if(status=="Disapproved"){
            return (
                <p id="status" className="px-3 py-1 text-sm font-bold text-red-500 bg-red-100 rounded">Disapproved</p>
            )
        }
        else{
            return (
                <p id="status" className="px-3 py-1 text-sm font-bold text-yellow-500 bg-yellow-100 rounded">Pending</p>
            )
        }
    }

    const handleDate=(fromDate,toDate)=>{
        var from = new Date(fromDate);
        var to = new Date(toDate);
        var fromYear = from.getFullYear();
        var toYear = to.getFullYear();
        var fromMonth = from.getMonth()+1;
        var toMonth = to.getMonth()+1;
        var fromDay = from.getDate();
        var toDay = to.getDate();
        return fromDay+"/"+fromMonth+"/"+fromYear+" - "+toDay+"/"+toMonth+"/"+toYear
    }


    return (
        <>{loading ? 
            <div className="flex justify-center items-center h-96">
             <AiOutlineLoading3Quarters
                className="fill-primary animate-spin my-4 mx-auto"
                size={36}/>
            </div>
        : ((internship!==null)?
            <div>
              <div className="max-w-2xl px-8 py-4 mx-auto rounded-lg shadow-lg" style={{ cursor: "auto" }}>
                <div className="flex items-center justify-between">
                    <div className="font-medium text-lg my-2">{internship["company_name"]}</div>
                    {handleStatus(internship["approved"])}
                </div>
                <div className="mt-1">
                    <Link href="/" className="text-2xl font-bold text-gray-700 hover:underline"><>{internship["company_website"]}</></Link>
                    <p className="mt-1">Dates : {handleDate(internship["internship_start_date"],internship["internship_end_date"])}</p>
                    <p className="mt-1">{internship["internship_mode"]} - {internship["training_type"]}</p>
                </div>
                <div className="flex justify-between">
                    {internship["approved"] === "Disapproved"?<div className="my-3 ">
                        <p className="mr-5 bg-red-200/60 px-2 py-1 rounded-xl"><span className="underline text-lg">Remarks</span> : {internship["admin_remarks"]}</p>
                    </div>
                    :internship["approved"] === "Incomplete"?<div className="my-3">
                    <div className="mr-5 bg-yellow-300/70 px-2 py-1 rounded-xl flex flex-row items-center">
                        <FiAlertTriangle className="mx-1" size ={22}/>
                        <span className="underline">Upload the signed Letter to Complete Registration</span>
                    </div>
                </div>:
                <div></div>}
                    <div>
                        <div className="Absolute right-0 bg-slate-300/30 px-2 py-1 my-2 rounded-md">
                    {internship["approved"] === "Incomplete"?
                    <form>
                        <label className="flex flex-row right-0 cursor-pointer" htmlFor="file-input">
                            <AiOutlineUpload className="fill-black " size={28}/>
                            <p className="text-sm mx-2 mt-1">Upload Letter</p>
                        </label>
                        <input id="file-input" type="file" onChange={(e)=> handleUpload(e)} style={{display:'none'}}/>
                        </form>:
                         <div></div>
                        }
                        </div>
                        <div>
                        {internship["approved"] !== "Disapproved"?<button onClick={(e)=> handleletter(e,internship["_id"],internship["approved"])}>
                            <div className="flex flex-row right-0 bg-slate-300/30 px-2 py-1 my-2">
                                <AiOutlineDownload className="fill-black " size={28}/>
                                <p className="text-sm mx-2 mt-1">Download Letter</p>
                            </div>
                        </button>:
                         <AiOutlineDownload className="fill-gray-300 " size={26}/>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        :<></>
        )
     }
           
        </>
    )
}