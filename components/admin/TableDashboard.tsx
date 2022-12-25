import React from "react";
import { useEffect } from "react";
import { useMemo, useState } from "react";
import ApprovalDisapprovalPending from "./ApprovalDisapprovalPending";
import InternshipDetailsModal from "./InternshipDetailsModal";
import { AiOutlineLoading3Quarters ,AiOutlineDownload} from "react-icons/ai";
import { useTable, useGlobalFilter, useFilters, usePagination } from "react-table";
import { CSVLink } from "react-csv";

import GlobalFilter from "./GlobalFilter";
import { ColumnFilter } from "./ColumnFilter";
import { MdRowing } from "react-icons/md";

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
  {
    Header: "Branch",
    accessor: "branch",
    Filter: ColumnFilter,
  }
];

const headers=[
  {label:"Name",key:"name"},
  {label:"Roll Number",key:"roll"},
  {label:"Branch",key:"branch"},
  {label:"Company Name",key:"company_name"},
  {label:"Company Location",key:"company_location"},
  {label:"Company Website",key:"company_website"},
  {label:"Company Email",key:"company_email"},
  {label:"Company Contact",key:"company_mobile"},
  {label:"Company Mentor",key:"company_person_name"},
  {label:"Type ",key:"training_type"},
  {label:"Internship Mode",key:"internship_mode"},
  {label:"Internship Start Date",key:"internship_start_date"},
  {label:"Internship End Date",key:"internship_end_date"},
  {label:"Status",key:"approved"},
]

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

export default function TableDashboard() {
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
      fetch("/api/admin/pendingInternships", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        const resData = await res.json();
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

  useEffect(() => {
    updateData(page);
  }, [page]);

  function StudentDetails(row) {
    let a = row.original;
    setStudentDetail(a);
    setOpenModal(true);
  }

  function updateData(page){
    let tempData=[];
    page.map((row,id)=>{
      tempData[id]=row.original
    })
    setCsvData(tempData)
  }

  return (
    <>
    <div className="flex flex-row justify-between">

      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      
      <div className=" px-1 py-2 bg-slate-200/60 rounded-md hover:bg-slate-300/60 cursor-pointer my-2">
      <CSVLink
        filename={"InternshipRegistered.csv"}
        data={csvData}
        headers={headers}
        className="mr-2 flex flex-row">
      <AiOutlineDownload className="fill-black ml-1 mr-2 " size={26}/>
           Download Table
      </CSVLink>
      </div>

    </div>
      {openModal && (
        <InternshipDetailsModal
          closeModal={setOpenModal}
          info={StudentDetail}
          setIsDone={setIsDone}
        />
      )}
      {(!empty && loading===false)?<div className="table max-w-5xl md:max-w-7xl mx-auto border-2 rounded-xl py-2 my-3 bg-gray-50">
        <table {...getTableProps()} className="table-fixed " >
          <thead className="">
            {headerGroups.map((headerGroup, i) => (
              <>
                <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      key={i}
                      scope="col"
                      className="text-lg text-center font-medium text-gray-900 px-3 py-4"
                      {...column.getHeaderProps()}>
                      {column.render("Header")}
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    </th>
                  ))}
                  {
                    <th
                      id="4"
                      className="text-lg text-center font-medium text-gray-900 px-3 py-4 pb-14 min-w-[250px]"
                      scope="col"
                    >
                      Approval
                    </th>
                  }
                </tr>
              </>
            ))}
          </thead>
          <tbody className="divide-y-2 bg-white truncate" {...getTableBodyProps()}>
            {
            page.map((row, i) => {
              prepareRow(row);
          
              return (
                <tr key={i} {...row.getRowProps()} className="hover:bg-slate-100/60 rounded-lg cursor-pointer">
                  {row.cells.map((cell) => {
                    return (
                      <>
                        <td
                          onClick={() => StudentDetails(row)}
                          key={i}
                          className="py-3 px-3 text-center max-w-[320px] overflow-hidden truncate"  
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                        
                      </>
                    );
                  })}
                  <ApprovalDisapprovalPending
                    internship={row.original}
                    isApproved={false}
                    setIsDone={setIsDone}
                    showModal={false}
                  />
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="my-5 mx-5 flex flex-row justify-end">
          <div className="my-auto">
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </div>
          <div className="my-auto">
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
          </div>
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
      </div>
      :(loading===true?
          <div className="flex justify-center items-center">

              <AiOutlineLoading3Quarters className="animate-spin fill-primary" size={42}/>

          </div>
        :<div className="flex justify-center items-center my-10">
          <h1 className="text-2xl font-bold">No Pending Internships.</h1>
         </div>)
      }  
    </>
  );
}

