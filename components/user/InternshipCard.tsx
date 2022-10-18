import Link from "next/link";
import { useEffect,useState } from "react";
import {AiOutlineDownload} from 'react-icons/ai'

export default function InternshipCard({id}) {

    const [internship, setInternship] = useState([]);

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
            });
    },[])

    return (
        <>
            <div>
                <div className="max-w-2xl px-8 py-4 mx-auto rounded-lg shadow-md" style={{ cursor: "auto" }}>
                    <div className="flex items-center justify-between">
                        <div className="font-medium text-lg">{internship["company_name"]}</div>
                        {/* <span className="text-sm font-light text-gray-800">Posted on {internship["company_name"]}</span> */}
                        {/* <p id="status" className={`px-3 py-1 text-sm font-bold transition-colors duration-200 transform rounded`}>{props.status}</p> */}
                        {internship["approved"] ? internship["approved"] === "Pending" ? <p id="status" className="px-3 py-1 text-sm font-bold text-yellow-500 bg-yellow-100 rounded">{internship["approved"]}</p> 
                        : internship["approved"] === "Approved" ? <p id="status" className="px-3 py-1 text-sm font-bold text-green-500 bg-green-100 rounded">{internship["approved"]}</p> 
                        : <p id="status" className="px-3 py-1 text-sm font-bold text-red-500 bg-red-100 rounded">{internship["approved"]}</p> 
                        : <p id="status" className="px-3 py-1 text-sm font-bold text-yellow-500 bg-yellow-100 rounded">Pending</p>}
                    </div>
                    <div className="mt-1">
                        <Link href="/" className="text-2xl font-bold text-gray-700 hover:underline"><>{internship["company_website"]}</></Link>
                        {/* <p className="mt-1">Internship : {new Date(internship["internship_start_date"])}</p> */}
                        <p className="mt-1">{internship["internship_mode"]} - {internship["company_location"]}</p>
                    </div>
                    <br />
                    <div className="flex justify-between">
                        <div>
                            <p>Remarks : {internship["admin_remark"]}</p>
                        </div>
                        <div>
                            <button>
                                <AiOutlineDownload className="fill-black " size={26}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <br />
        </>
    )
}