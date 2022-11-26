import React from "react";
import { useEffect } from "react";
import { useMemo, useState } from "react";
import ApprovalDisapprovalCompletion from "./ApprovalDisapprovalCompletion";
import InternshipDetailsModal from "./InternshipDetailsModal";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useTable, useGlobalFilter, useFilters, usePagination } from "react-table";

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
    Cell: ({ row: { original } }) => (
      <div>
       <p>
        {timeDuration(original.internship_start_date, original.internship_end_date)} Days
      </p>
      <div>
        {toDDmmm(original.internship_start_date)} - {toDDmmm(original.internship_end_date)}
      </div> 
      </div>
    )
  },
  {
    Header: "Company Name",
    accessor: "company_name",
    Filter: ColumnFilter,
  },
];

const timeDuration = (start, end) => {
  const startDate: any = new Date(start);
  const endDate: any = new Date(end);
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
const toDDmmm = (date) => {
  const d = new Date(date);
  const month = d.toLocaleString('default', { month: 'short' });
  return `${d.getDate()} ${month}`;
} 

export default function TableCompletionApproal() {
  const [loading, setLoading] = useState(true);
  const [csvData, setCsvData] = useState([]);
  const [data, setData] = useState([]);
  const [show, setShow] = React.useState(false);
  const [modal, setModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [StudentDetail, setStudentDetail] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [empty, setEmpty] = useState(false);

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
    page,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    nextPage,
    previousPage,
    prepareRow,
    state,
    setGlobalFilter,
    setPageSize
  } = useTable({ columns, data }, useFilters, useGlobalFilter, usePagination);

  const { globalFilter, pageIndex, pageSize } = state;

  useEffect(() => {
    try{
      setLoading(true);
      fetch("/api/admin/completedInternships", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        const resData = await res.json();
        console.log("sdsd",resData);

        if (resData.success) {
          setData(resData.data);
        }else{
          setEmpty(true);
        }
      });
      setLoading(false);
      setIsDone(false);
    }catch(e){
      setLoading(false);
      console.log(e);
    }
  }, [isDone]);

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
      {(!empty && loading===false)?<div className="table max-w-5xl md:max-w-7xl mx-auto">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <>
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
                      scope="col"
                    >
                      Details
                    </th>
                  )}
                  {
                    <th
                      id="4"
                      className="text-lg text-center font-medium text-gray-900 px-6 py-4 pb-14"
                      scope="col"
                    >
                      Approval
                    </th>
                  }
                </tr>
              </>
            ))}
          </thead>
          <tbody className="divide-y-2" {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr key={i} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <>
                        <td
                        onClick={() => StudentDetails(row)}
                          key={i}
                          className="p-4 text-center cursor-pointer"  
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      </>
                    );
                  })}
                  <td>
                    <button
                      className="ml-2 inline-flex items-center justify-center whitespace-nowrap 
                                    rounded-md border border-transparent bg-primary my-2 px-3 py-1 text-base font-medium text-white shadow-sm hover:bg-pink-900"
                      onClick={() => StudentDetails(row)}
                    >
                      Branch/Course
                    </button>
                  </td>
                  <ApprovalDisapprovalCompletion
                    internship={row.original}
                    isApproved={false}
                    setIsDone={setIsDone}
                  />
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="my-5 mx-5">
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <span>
            <select
            className="ml-2 inline-flex items-center justify-center whitespace-nowrap px-2 py-1"
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value))}>
              {
                [5,10,20,50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))
              }
            </select>
          </span>
          <button
            onClick={() => gotoPage(0)}
              className="px-2 py-1 bg-slate-500/40 m-2 rounded-lg shadow-lg hover:bg-slate-500/75 cursor-pointer"
            disabled={!canPreviousPage}>
            {'<<'}
          </button>
          <button
            className="px-2 py-1 bg-slate-500/40 m-2 rounded-lg shadow-lg hover:bg-slate-500/75 cursor-pointer"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}>
             Previous
          </button>
          <button
            className="px-2 py-1 bg-slate-500/40 m-2 rounded-lg shadow-lg hover:bg-slate-500/75 cursor-pointer"
            onClick={() => nextPage()}
            disabled={!canNextPage}>
            Next
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            className="px-2 py-1 bg-slate-500/40 m-2 rounded-lg shadow-lg hover:bg-slate-500/75 cursor-pointer"
            disabled={!canNextPage}>
            {'>>'}
          </button>
        </div>
      </div>:(loading===true?<div className="flex justify-center items-center">
        <div className="">
          <AiOutlineLoading3Quarters className="animate-spin fill-primary" size={42}/>
        </div>
        </div>:<div className="flex justify-center items-center my-10">
          <h1 className="text-2xl font-bold">No Pending Internships.</h1>
        </div>)
      }  
    </>
  );
}
