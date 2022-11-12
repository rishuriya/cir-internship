import { useMemo, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import InternshipCard from "./InternshipCard";
import { useEffect } from 'react';
import { CSVLink, CSVDownload } from 'react-csv'
import { useTable, usePagination, useRowState } from 'react-table'
import StudentDetailsModal from './StudentDetailsModal'
import React from 'react';
import Modal from './Modal';
import ApprovalDisapproval from './ApprovalDisapproval'
import { MdApproval } from 'react-icons/md';
import ApprovedInternships from '../../pages/admin/approved-internships';

const tableColumns = [
  {
    Header: 'Name',
    accessor: 'name'
  },
  {
    Header: 'Roll Number',
    accessor: 'roll'
  },
  {
    Header: 'Duration',
    accessor: 'internship_start_date'
  },
  {
    Header: 'Company Name',
    accessor: 'company_name'
  },
  {
    Header: 'Approval',
    accessor: 'approval'
  }
]

function InternshipList() {

  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [csvData, setCsvData] = useState([]);
  const [data, setData] = useState([]);
  const [show, setShow] = React.useState(false)
  const [modal, setModal] = useState(false);
  const [openModal,setOpenModal] = useState(false);
  const [StudentDetail,setStudentDetail] = useState({})

  const columns = useMemo(() => tableColumns, []);
  // const data = useMemo(() => internships, []);
  const close = () => {
    setShow(false);
  }
  
  // Function to close Modal
  const open = () => {
    setShow(true);
  }

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })

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
        setData(resData.data);
        // setCsvData(resData.data);
      }
    });
  }, [])

  useEffect(() => {
    if (internships.length > 0) {
      setLoading(false);
    }
  }, [internships])

  function  StudentDetails(row) {
    console.log("Hello world these are the students applied for Internship")
    console.log(row.original);
    let a=row.original;
    setStudentDetail(a)
    // {setOpenModal(true);}
    // {openModal && <StudentDetailsModal closeModal={setOpenModal} row={row}/> }
    // <Modal show={show}></Modal>
    setOpenModal(true);
  }


  return (
    <>
    {/* <StudentDetailsModal /> */}
    {openModal && <StudentDetailsModal closeModal={setOpenModal} info={StudentDetail} />}
      <div className='table max-w-5xl md:max-w-7xl mx-auto'>
        <table {...getTableProps()}>
          <thead>
            {
              headerGroups.map((headerGroup, i) => (
                <React.Fragment  key={i}>
                  <tr
                    {...headerGroup.getHeaderGroupProps()}>
                    {
                      headerGroup.headers.map((column) => (
                        <th
                          key={i}
                          scope="col"
                          className="text-sm text-center font-medium text-gray-900 px-6 py-4"
                          {...column.getHeaderProps()}>{column.render('Header')}</th>
                      ))
                    }
                    {(i === headerGroups.length - 1) && <th className="text-sm text-center font-medium text-gray-900 px-6 py-4">Details</th>}
                  </tr>
                </React.Fragment>
              ))
            }
          </thead>
          <tbody
            className='divide-y-2'
            {...getTableBodyProps()}>
            {
              rows.map((row, i) => {
                prepareRow(row)
                return <tr
                  key={i}
                  {...row.getRowProps()}>
                  {
                    row.cells.map((cell) => {
                      return (

                        <>
                          <td
                            key={i}
                            className='p-4 text-center'
                            {...cell.getCellProps()}>{cell.render('Cell')}
                          </td>
                          {/* {(i === rows.length - 1) && <td className='p-4 text-center'>l</td>} */}
                        </>
                      )
                    })
                  }
                  <ApprovalDisapproval
                  internship={row.original}
                  isApproved={false}
                  />
                  <button
                    className="ml-2 inline-flex items-center justify-center whitespace-nowrap 
                  rounded-md border border-transparent bg-primary my-2 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-pink-900"
                    onClick={() => StudentDetails(row)}
                  >
                    Details
                  </button>

                </tr>
              }
              )
            }

          </tbody>
        </table>
      </div>
    </>
  )
}

export default InternshipList;