import { useMemo, useState } from "react";
import { useEffect } from "react";
import { useTable, useGlobalFilter, useFilters } from "react-table";
import InternshipDetailsModal from "./InternshipDetailsModal";
import React from "react";
import { AiOutlineLoading3Quarters} from "react-icons/ai";
import ApprovalDisapproval from "./ApprovalDisapproval";

import GlobalFilter from "./GlobalFilter";
import { ColumnFilter } from "./ColumnFilter";

const tableColumns = [
  {
    Header: "Name",
    accessor: "name",
    Filter: ColumnFilter,
  },
  {
    Header: "Roll Number",
    accessor: "roll",
    Filter: ColumnFilter,
  },
  {
    Header: "Duration",
    accessor: "internship_start_date",
    Filter: ColumnFilter,
  },
  {
    Header: "Company Name",
    accessor: "company_name",
    Filter: ColumnFilter,
  },
];

export default function ApprovedInternships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [data, setData] = useState([]);
  const [show, setShow] = React.useState(false);
  const [modal, setModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [StudentDetail, setStudentDetail] = useState([]);
  const [isDone, setIsDone] = useState(false);


  const columns = useMemo(() => tableColumns, []);
  const close = () => {
    setShow(false);
  };

  // Function to close Modal
  const open = () => {
    setShow(true);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useFilters, useGlobalFilter);

  const { globalFilter } = state;

  useEffect(() => {
    try{
      setLoading(true);
      fetch("/api/admin/approvedInternships", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        const resData = await res.json();
        if (resData.success) {
          // console.log(resData.data);
          setInternships(resData.data);
          setData(resData.data);
          // setCsvData(resData.data);
        }});
        setLoading(false);
      }
    catch(error){
      setLoading(false);
      console.log("error",error);
    }
  }, []);

  useEffect(() => {
    if (internships.length > 0) {
      setLoading(false);
    }
  }, [internships]);

  function StudentDetails(row) {
    let a = row.original;
    setStudentDetail(a);
    setOpenModal(true);
  }

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      {/* <StudentDetailsModal /> */}
      {openModal && (
        <InternshipDetailsModal
          closeModal={setOpenModal}
          info={StudentDetail}
        />
      )}
      {(StudentDetail.length!==0 && loading===false)?<div className="table max-w-5xl md:max-w-7xl mx-auto">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <React.Fragment key={i}>
                <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      key={i}
                      scope="col"
                      className="text-lg text-center font-medium text-gray-900 px-6 py-4"
                      {...column.getHeaderProps()}>
                      {column.render("Header")}
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    </th>
                  ))}
                  {i === headerGroups.length - 1 && (
                    <th
                      className="text-lg text-center font-medium text-gray-900 px-6 py-4 pb-14"
                      scope="col">
                      Details
                    </th>
                  )}
                  {
                    <th
                      id="4"
                      className="text-lg text-center font-medium text-gray-900 px-6 py-4 pb-14"
                      scope="col">
                      Approval
                    </th>
                  }
                </tr>
              </React.Fragment>
            ))}
          </thead>
          <tbody className="divide-y-2" {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr key={i} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <>
                        <td
                          key={i}
                          className="p-4 text-center"
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                        {/* {(i === rows.length - 1) && <td className='p-4 text-center'>l</td>} */}
                      </>
                    );
                  })}
                  <td>
                    <button
                      className="ml-2 inline-flex items-center justify-center whitespace-nowrap 
                                    rounded-md border border-transparent bg-primary my-2 px-3 py-1 text-base font-medium text-white shadow-sm hover:bg-pink-900"
                      onClick={() => StudentDetails(row)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>:
      (
        loading===true?
        <div className="flex justify-center items-center">
         <AiOutlineLoading3Quarters className="fill-primary animate-spin my-4 ml-4"
          size={36}/>
        </div>:
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold">No Internships Found</h1>
        </div>
      )
     }
    </>
  );
}
