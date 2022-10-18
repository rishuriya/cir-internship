import Link from "next/link";
import { useEffect,useState } from "react";

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
                        <span className="text-sm font-light text-gray-800">Posted on {internship["company_name"]}</span>
                        {/* <p id="status" className={`px-3 py-1 text-sm font-bold transition-colors duration-200 transform rounded`}>{props.status}</p> */}
                        {internship.status ? internship.status === "Pending" ? <p id="status" className="px-3 py-1 text-sm font-bold text-yellow-500 bg-yellow-100 rounded">{props.status}</p> 
                        : props.status === "Approved" ? <p id="status" className="px-3 py-1 text-sm font-bold text-green-500 bg-green-100 rounded">{props.status}</p> 
                        : <p id="status" className="px-3 py-1 text-sm font-bold text-red-500 bg-red-100 rounded">{props.status}</p> 
                        : <p id="status" className="px-3 py-1 text-sm font-bold text-yellow-500 bg-yellow-100 rounded">Pending</p>}
                    </div>
                    <div className="mt-1">
                        <Link href="/" className="text-2xl font-bold text-gray-700 hover:underline">{props.company}</Link>
                        {/* <p className="mt-1">Internship : {new Date(internship["internship_start_date"])}</p> */}
                        {/* <p className="mt-1">{props.mode} - {props.place}</p> */}
                    </div>
                    <br />
                    <div className="flex justify-between">
                        <div>
                            <p>Remarks : {internship["remark"]}</p>
                        </div>
                        <div>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <br />
        </>
    )
}