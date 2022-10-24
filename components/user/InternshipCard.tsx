import Link from "next/link";
import { useEffect,useState } from "react";
import {AiOutlineDownload} from 'react-icons/ai'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/router";
export default function InternshipCard({id}) {

    const [internship, setInternship] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(()=>{
        fetch("/api/student/fetch-Internship", {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf8 ",
              },
              body: JSON.stringify({id}),
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
        if(approve=="Approved"){
                router.push({
                    pathname: '/internshipLetter',
                    query: { id: uid },
                 },"/internshipLetter")
                }
                else{
                    throw "Not Approved"
                }
        return;
    }

    const handleStatus=(status)=>{
        if(status=="Approved"){
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
                    {internship["approved"] === "Disapproved"?<div className="my-3">
                        <p className="mr-5 bg-red-200/60 px-2 py-1 rounded-xl"><span className="underline text-lg">Remarks</span> : {internship["admin_remarks"]}</p>
                    </div>
                    :<div></div>}
                    <div>
                        {internship["approved"] === "Approved"?<button onClick={(e)=> handleletter(e,internship["_id"],internship["approved"])}>
                            <div className="flex flex-row">
                                <p className="text-sm mx-2 mt-1">Download Letter</p>
                                <AiOutlineDownload className="fill-black " size={28}/>
                            </div>
                        </button>:
                         <AiOutlineDownload className="fill-gray-300 " size={26}/>
                        }
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