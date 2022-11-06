import { useMemo, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import InternshipCard from "./InternshipCard";
import { useEffect } from 'react';
import { CSVLink, CSVDownload } from 'react-csv'
import { useTable, usePagination } from 'react-table'

const testData = [
  {
    approved: "Incomplete",
    company_email: "company@email",
    company_location: "usa",
    company_mobile: "31314",
    company_name: "choogle",
    company_person_name: "james swain",
    company_website: "https://company.com",
    internship_end_date: "2022-11-29T00:00:00.000Z",
    internship_mode: "Offline",
    internship_start_date: "2022-11-07T00:00:00.000Z",
    member: null,
    name: "hari",
    request_letter: null,
    roll: "AM.EN.U4AIE21034",
    training_type: "Industrtial Visit",
    user: "63676eeffa1d7777437f2692",
    __v: 0,
    _id: "63676fb5fa1d7777437f26a6"
  }
]

const tableColumns = [
  {
    Header: 'Name',
    accessor: 'name'
  },
  {
    Header: 'Roll',
    accessor: 'roll'
  },
  {
    Header: 'Duration',
    accessor: 'internship_start_date'
  },
  {
    Header: 'Company Name',
    accessor: 'company_name'
  }
]

function InternshipList() {

  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [csvData, setCsvData] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const columns = useMemo(() => tableColumns, []);
  const data = useMemo(() => internships, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({columns, data})

  useEffect(() => {
    fetch("/api/admin/allInternships", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async (res) => {
      const resData = await res.json();
      if (resData.success) {
        console.log(resData.data);
        setInternships(resData.data);
        setCsvData(resData.data);
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
      {/* <CSVLink data={csvData} filename={"internships.csv"}>Download CSV</CSVLink>
      <div className="pt-2 flex justify-center m-10 text-gray-600">
        <input className="border-2 border-gray-300 bg-white h-10 rounded-lg text-sm focus:outline-none text-center w-96"
          onChange={(event) => { setSearchTerm(event.target.value) }}
          value={searchTerm}
          type="search" name="search" placeholder="Search" />
      </div>
      {(!loading && internships.find(i => i.approved === "Incomplete")) ? (
        <div className='table max-w-5xl md:max-w-7xl mx-auto'>
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
                if (user.approved === "Incomplete" || user.approved === "") {
                  console.log(user);

                  return (
                    <InternshipCard
                      key={user.id}
                      internship={user}
                      isApproved={false}
                    />
                  )
                }
              })}

          </tbody>
        </div>
      ) : (<>
        <span className='fill-primary my-10 mx-auto animate-spin' >No Internship Record</span>
      </>)

      } */}

      <table {...getTableProps()}>
        <thead>
          {
            headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            rows.map((row, i) => {
              prepareRow(row)
              return <tr {...row.getRowProps()}>
                {
                  row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}
                    </td>
                  })
                }
              </tr>
          }
          )}
        </tbody>
      </table>
    </>
  )
}

export default InternshipList;
