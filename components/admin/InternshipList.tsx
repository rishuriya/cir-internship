import { useMemo, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import InternshipCard from "./InternshipCard";
import { useEffect } from 'react';
import { CSVLink, CSVDownload } from 'react-csv'
import { useTable, usePagination, useRowState } from 'react-table'
import StudentDetailsModal from './StudentDetailsModal'
import React from 'react';
import Modal from './Modal';
import FilteringTable from './FilteringTable';

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
]

function InternshipList() {

  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [csvData, setCsvData] = useState([]);
  const [data, setData] = useState([]);
  const [show, setShow] = React.useState(false)
  const [modal, setModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [StudentDetail, setStudentDetail] = useState({})

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

  function StudentDetails(row) {
    console.log("Hello world these are the students applied for Internship")
    console.log(row.original);
    let a = row.original;
    setStudentDetail(a);
    setOpenModal(true);
  }


  return (
    <>
      <FilteringTable />
    </>
  )
}

export default InternshipList;