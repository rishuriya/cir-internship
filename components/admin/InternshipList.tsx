import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import InternshipCard from "./InternshipCard";
import { useEffect } from 'react';
import { type } from 'os';

function InternshipList() {

  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/admin/allInternships", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async (res) => {
      const resData = await res.json();

      if (resData.success) {
        setInternships(resData.data);
        // console.log("ok", internships);
      }

    });
  }, [])

  useEffect(() => {
    if (internships.length > 0) {
      setLoading(false);
    }
  }, [internships])


  return (
    <>
      <input type="text" placeholder='Search'
        onChange={(event) => { setSearchTerm(event.target.value) }} />
      {(!loading) ? (
        <div className='table max-w-5xl md:max-w-7xl '>
          <thead className=''>
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">

              </th>
              <th scope="col" className="text-sm text-center font-medium text-gray-900 px-6 py-4">
                Student Name
              </th>
              <th scope="col" className="text-sm text-center font-medium text-gray-900 px-6 py-4">
                Roll No.
              </th>
              <th scope="col" className="text-sm text-center font-medium text-gray-900 px-6 py-4">
                Duration
              </th>
              <th scope="col" className="text-sm text-center font-medium text-gray-900 px-6 py-4">
                Company
              </th>
              <th scope="col" className="text-sm text-center font-medium text-gray-900 px-6 py-4">
                Mode/Type
              </th>
              <th scope="col" className="text-sm text-center font-medium text-gray-900 px-6 py-4">
                Approval
              </th>
            </tr>
          </thead>
          <tbody className='divide-y-2'>
            {internships
              .filter((internship) => {
                if (searchTerm == "") {
                  return internship
                } else if ((typeof internship.roll === 'string' && internship.roll.toLowerCase().includes(searchTerm.toLowerCase())) || 
                (typeof internship.name === 'string' && internship.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
                (typeof internship.company_name === 'string' && internship.company_name.toLowerCase().includes(searchTerm.toLowerCase()))) {
                  return internship
                }
              })
              .map((user) => {
                if (user.approved === "Pending") {
                  // console.log(user);
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
      ) : (<>
        <AiOutlineLoading3Quarters className='fill-primary my-10 mx-auto animate-spin' size={42} />
      </>)

      }
    </>
  )
}

export default InternshipList;
