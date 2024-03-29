import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { AiOutlineDownload, AiOutlineUpload } from "react-icons/ai";
import { AiOutlineLoading3Quarters,AiOutlineClockCircle,AiOutlineCheckCircle } from "react-icons/ai";
import Cookies from "js-cookie";

export default function InternshipCard({ id }) {
  const [internship, setInternship] = useState([]);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [pageUpdate, setPageUpdate] = useState(false);
  const router = useRouter();
  let fileimg;

  useEffect(() => {
    fetch(`../api/internship/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf8 ","authorisation": `${Cookies.get("token")}`,
      },
    }).then(async (res) => {
      const resData = await res.json();
      let internship_data = resData.data;
      if (internship_data) {
        setInternship(internship_data);
      }
      setLoading(false);
    });
  }, [pageUpdate]);


  function handleletter(e, uid, approve) {
    if (approve != "Disapproved") {
      router.push(
        {
          pathname: "/user/internshipLetter",
          query: { id: uid },
        },
        "/user/internshipLetter"
      );
    } else {
      throw "Not Approved";
    }
    return;
  }
  function handleInternshipletter(e, uid, approve) {
    if (approve == "Approved") {
      router.push(
        {
          pathname: "/admin/company-letter",
          query: { id: internship["_id"], user: internship["user"] },
        },
        "/admin/company-letter"
      );
    } else {
      throw "Not Approved";
    }
    return;
  }
  const handleUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0];
      fileimg = i;
      setImage(e.target.files[0]);
      if (await confirm(`Want to upload - ${e.target.files[0].name}`) == false) {
        return;
      }
    }
    const token = Cookies.get('token') || "";
    if (fileimg != undefined) {
      const body = new FormData();
      body.append("file", fileimg);
      body.append("id", id);
      fetch("/api/student/hod_file", {
        method: "POST",
        body,
      }).then(async (response) => {
        const fileres = await response.json();
        const bodyObject = {
          _id: internship["_id"],
          hod_letter: fileres.url.replace("./public/", ""),
          approved: "Pending",
        };
        fetch("/api/admin/admin_decision", {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf8 ", 'authorisation': `${token}`
          },
          body: JSON.stringify(bodyObject),
        }).then(async (res) => {
          const resData = await res.json();
          if (resData.success) {
            // window.location.reload();
            setPageUpdate(!pageUpdate);
          } else {
            console.log(resData.error);
          }
        });
      });
    }
  };

  const handleCertificateUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0];
      fileimg = i;
      setImage(e.target.files[0]);
      //console.log(fileimg)
      if (await confirm(`Want to upload - ${e.target.files[0].name}`) == false) {
        return;
      }
    }
    if (fileimg != undefined) {
      // console.log(fileimg)
      const body = new FormData();
      body.append("file", fileimg);
      body.append("id", id);
      fetch("/api/student/certificate", {
        method: "POST",
        body,
      }).then(async (response) => {
        const fileres = await response.json();
        const bodyObject = {
          user:internship["user"],
          internship: internship["_id"],
          completion_certificate: fileres.url.replace("./public/", ""),
        };
        fetch("/api/student/verification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf8 ",
          },
          body: JSON.stringify(bodyObject),
        }).then(async (res) => {
          const resData = await res.json();
          if (resData.success) {
            // window.location.reload();
            setPageUpdate(!pageUpdate);
          } else {
            console.log(resData.message);
          }
        });
      });
    }
  };

  const handleStatus = (status) => {
    if (status == "Incomplete") {
      return (
        <p
          id="status"
          className="px-3 py-1 text-sm md:text-base font-bold text-blue-500 bg-blue-100 rounded"
          title="Upload signed Letter from HOD/counceller to complete the process"
        >
          Incomplete
        </p>
      );
    } else if (status === "Approved") {
      return (
        <p
          id="status"
          className="px-3 py-1 text-sm md:text-base font-bold text-green-500 bg-green-100 rounded"
        >
          Approved
        </p>
      );
    } else if (status === "Disapproved") {
      return (
        <p
          id="status"
          className="px-3 py-1 text-sm md:text-base font-bold text-red-500 bg-red-100 rounded"
        >
          Disapproved
        </p>
      );
    } 
    else if (status === "Completed"){
      return (
        <p

          id="status"
          className="px-3 py-1 text-sm md:text-base font-bold text-green-500 bg-green-100 rounded"
        >
          Completed
        </p>
      );
    }
     else if (status === "Pending"){
      return (
        <p
          id="status"
          className="px-3 py-1 text-sm md:text-base font-bold text-yellow-500 bg-yellow-100 rounded"
        >
          Pending
        </p>
      );
    }
    else if (status === "Pending Verification"){
      return(
        <p
          id="status"
          className="px-3 py-1 text-sm md:text-base font-bold text-orange-500 bg-orange-100 rounded"
        >
          Verification pending
        </p>
      );
    }
  };

  const handleDateToDDmmmYYYY = (fromDate, toDate) => {
    let monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let fromdate =
      new Date(fromDate).getDate() +
      " " +
      monthNames[new Date(fromDate).getMonth()] +
      " " +
      new Date(fromDate).getFullYear();
    let todate =
      new Date(toDate).getDate() +
      " " +
      monthNames[new Date(toDate).getMonth()] +
      " " +
      new Date(toDate).getFullYear();
    return fromdate + " - " + todate;
  };

    const daysLeft = (toDate:string) => {
      let today = new Date();
      let todate = new Date(toDate);
      let diff = todate.getTime() - today.getTime();
      let days = Math.ceil(diff / (1000 * 3600 * 24));
      return days;
    }


  return(
    <>
      {loading ? (
        <div className="flex justify-center items-center h-80 max-w-3xl border-2 mx-auto my-4 rounded-xl shadow-lg bg-gray-200 animate-pulse">
          <AiOutlineLoading3Quarters
            className="fill-primary animate-spin my-4 mx-auto"
            size={42}
          />
        </div>
      ) : internship !== null && (
        <div>
          <div
            className="max-w-4xl px-8 py-4 my-4 mx-auto rounded-lg shadow-lg border-2"
            style={{ cursor: "auto" }}>
            <div className="flex items-center justify-between">
              <div className="font-medium text-lg md:text-2xl my-2">
                {internship["company_name"]}
              </div>
              {handleStatus(internship["approved"])}
            </div>
            <div className="mt-1 ml-2 flex flex-row">
              <div>
              <p className="mt-1 text-md">
                <span className="font-semibold">Company Website : </span>
                <a href={internship["company_website"]}  className="underline text-blue-600 hover:text-blue-800">{internship["company_website"]} </a>
              </p>
              <p className="mt-1 text-md">
                <span className="font-semibold">Email : </span>
                <a href={`mailto: ${internship["company_email"]}`}  className="underline text-blue-600 hover:text-blue-800">{internship["company_email"]}</a>

              </p>
              <p className="mt-1 text-md">
                <span className="font-semibold">Phone no. : </span>
                {internship["company_mobile"]}
              </p>
              <p className="mt-1 text-md">
                <span className="font-semibold">Mode : </span>
                {internship["internship_mode"]} 
              </p>
              <p className="mt-1 text-md">
                <span className="font-semibold">Type : </span>

                {internship["training_type"]}
              </p>
              <p className="mt-1">
                {" "}
                <span className="font-semibold">Dates : </span>
                {handleDateToDDmmmYYYY(
                  internship["internship_start_date"],
                  internship["internship_end_date"]
                )}
              </p>
              </div>
              <div className="">
              </div>
            </div>
            <div className="flex justify-between border-t-2 mt-5">
              {internship["approved"] === "Disapproved" &&(
                <div className="my-3 ">
                  <p className="mr-5 bg-red-200/60 px-2 py-1 rounded-xl">
                    <span className="underline text-lg">Remarks</span> :{" "}
                    {internship["admin_remarks"]}
                  </p>
                </div>
              ) }
              
                {internship["approved"] === "Incomplete" && (
                  <div className="flex flex-row justify-evenly w-full">
                    <div className="my-auto flex flex-row mr-5 bg-yellow-200/60 px-2 py-1 rounded-xl max-w-xl">
                    <div className="mx-2 hidden md:block"><FiAlertTriangle className="fill-yellow-600" size={26}/></div>
                    <p className="text-sm md:text-base">
                    Download the letter template below, have it approved by your department head or counsellor, and then <span className="font-medium">Upload it here</span>.
                  </p>
                    </div>
                      <div className="flex flex-col ">
                      <form className="right-0 bg-slate-300/30 shadow-md hover:shadow-none px-2 py-1 my-2 rounded-md">
                        <label
                          className="flex flex-row right-0 cursor-pointer"
                          htmlFor="file-input">
                          <AiOutlineUpload className="fill-black " size={28} />
                          <p className="text-sm md:text-base mx-2 mt-1">Upload Letter</p>
                        </label>
                        <input
                          id="file-input"
                          type="file"
                          onChange={(e) => handleUpload(e)}
                          style={{ display: "none" }}
                          accept="application/pdf"
                        />
                      </form>
                    <button
                      onClick={(e) =>
                        handleletter(
                          e,
                          internship["_id"],
                          internship["approved"])}>
                      <div className="flex flex-row right-0 bg-slate-300/30 px-2 py-1 my-2 rounded-md">
                        <AiOutlineDownload className="fill-black " size={28} />
                        <p className="text-sm mx-1 mt-1 ">Letter Template</p>
                      </div>
                    </button>
                    </div>
                  </div>
                ) }
                
                {internship["approved"] === "Approved" && (
                    <>
                    {
                        (daysLeft(internship["internship_end_date"]) <= 0) ? (
                          <div className="flex flex-row  w-full">
                          <p className="mr-5 bg-yellow-200/60 px-2 py-1 rounded-xl max-w-xl my-auto md:mr-10 lg:mr-12 flex flex-row"><span className="mx-2 "><FiAlertTriangle className="fill-yellow-600" size={26}/></span> Upload your internship completion certificate here.
                          </p>
                            <form className="right-0 bg-slate-300/30 px-2 py-1 my-2 rounded-md shadow-md hover:shadow-sm mx-2 mt-4">
                            <label
                              className="flex flex-row right-0 cursor-pointer"
                              htmlFor="file-input"
                              >
                              <AiOutlineUpload className="fill-black " size={28} />

                              <p className="text-sm md:text-base mx-2 mt-1">Upload Internship Certificate</p>
                            </label>
                            <input
                              id="file-input"
                              type="file"
                              onChange={(e) => handleCertificateUpload(e)}
                              style={{ display: "none" }}
                              accept="application/pdf"
                              />
                          </form>
                              </div>
                            ) : (
                              <div className="flex flex-row justify-between w-full">
                            <div className="flex flex-row right-0 bg-slate-300/30 px-2 py-1 my-2 rounded-md">
                                <AiOutlineClockCircle className="fill-black " size={26} />
                                <p className="text-sm mx-2 mt-1">Days Left : {daysLeft(internship["internship_end_date"])} </p>
                            </div>
                            <div className="flex flex-col ">
                            <button
                            onClick={(e) =>
                              handleInternshipletter(
                                e,
                                internship["_id"],
                                internship["approved"])}>
                            <div className="flex flex-row right-0 bg-slate-300/30 px-2 py-1 my-2 rounded-md">
                              <AiOutlineDownload className="fill-black " size={28} />
                              <p className="text-sm mx-1 mt-1 ">Letter Template</p>
                            </div>
                          </button>
                          </div>
                          </div>
                        )
                    }
                    </>
                )}
                {
                    internship["approved"] === "Pending" && (
                        <div className="flex flex-row right-0 bg-slate-300/30 px-2 py-1 my-2 rounded-md">
                            <AiOutlineClockCircle className="fill-black my-auto" size={24} />
                            <p className="text-sm md:text-base my-auto mx-2 mt-1">Pending Approval</p>
                            <p className="text-sm hidden my-auto md:block"> - CIR Office has to Approve it</p>
                        </div>
                    )
                }
                {
                    internship["approved"] === "Completed" && (
                        <div className="flex flex-row right-0 bg-slate-300/30 px-2 py-1 my-2 rounded-md">
                            <AiOutlineCheckCircle className="fill-black my-auto " size={24} />
                            <p className="text-sm my-auto md:text-base mx-2 mt-1">Completed</p>
                            {/* <p className="text-sm hidden md:block"> </p> */}
                        </div>
                     )
                }
                {
                    internship["approved"] === "Pending Verification" && (
                      <div>
                        <div className="flex flex-row right-0 bg-slate-300/30 px-2 py-1 my-2 rounded-md">
                            <AiOutlineClockCircle className="fill-black my-auto" size={24} />
                            <p className="text-sm my-auto md:text-base mx-2 mt-1">Pending Verification</p>
                            <p className="text-sm hidden my-auto md:block"> - CIR Office has to Verify its completion</p>
                          </div>
                      </div>
                    )
                }
            </div>
          </div>
          </div>
      )}
      </>
    );
  }