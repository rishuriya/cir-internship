import React from "react";
import { useEffect } from "react";
import { useMemo, useState } from "react";
import SchoolAddPopup from "./SchoolAddPopup";
import { AiOutlineLoading3Quarters ,AiOutlineDownload} from "react-icons/ai";
import { useTable, useGlobalFilter, useFilters, usePagination } from "react-table";
import {GrAddCircle} from "react-icons/gr";
import { ColumnFilter } from "./ColumnFilter";
import { MdRowing } from "react-icons/md";

const tableColumns = [
  {
    Header: "School",
    accessor: "school_name",
    // Filter: ColumnFilter,
  },
  {
    Header: "Course",
    accessor: "course",
    // Filter: ColumnFilter,
  },
{
    Header: "Branch",
    accessor: "branch",
    // Filter: ColumnFilter,
  },
];

const dummyData = [
    {
        "school_name": "School of Engineering",
        "branch": "CSE",
        "course": "B.Tech",
    },
    {
        "school_name": "School of Engineering",
        "branch": "CSE",
        "course": "B.Tech",
    },
    {
        "school_name": "School of Engineering",
        "branch": "CSE",
        "course": "B.Tech",
    },
    {
        "school_name": "School of Engineering",
        "branch": "CSE",
        "course": "B.Tech",
    },];

export default function TableDashboard() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(dummyData);
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
    prepareRow,
  } = useTable({ columns, data }, useFilters, useGlobalFilter, usePagination);


  function StudentDetails(row) {
    let a = row.original;
    setStudentDetail(a);
    setOpenModal(true);
  }


  return (
    <>
      {openModal && (
        <SchoolAddPopup
          closeModal={setOpenModal}
          // setIsDone={setIsDone}
        />
      )}
      {(!empty && loading===false)?<div className="table max-w-5xl md:max-w-7xl mx-auto">
        <table {...getTableProps()} >
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <>
                <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      key={i}
                      scope="col"
                      className="text-xl text-center font-semibold text-gray-900 px-7 py-4 "
                      {...column.getHeaderProps()}>
                      {column.render("Header")}
                      <div>
                        <GrAddCircle size={26} className="border-2 p-2 h-10 w-10 cursor-pointer rounded-lg hover:bg-slate-200 mx-auto"/>
                      </div>
                    </th>
                  ))}
                  {
                    <th
                      id="4"
                      className="text-lg text-center font-medium text-gray-900 px-3 py-4 pb-14"
                      scope="col"
                    >
                      Remove
                    </th>
                  }
                </tr>
              </>
            ))}
          </thead>
          <tbody className="divide-y-2" {...getTableBodyProps()}>
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
                          className="px-3 text-center text-lg font-medium text-gray-900 py-5"  
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                        
                      </>
                    );
                  })}
                  <div className="bg-red-50 border-2 border-red-400 px-2 py-1 my-4 rounded-md ">
                    Delete
                  </div>
                </tr>
              );
            })}
          </tbody>
        </table>
        
      </div>:(loading===true?<div className="flex justify-center items-center">
        <div className="">
          <AiOutlineLoading3Quarters className="animate-spin fill-primary" size={42}/>
        </div>
        </div>:<div className="flex justify-center items-center my-10">
          <h1 className="text-2xl font-bold">Something went wrong...</h1>
        </div>)
      }  
    </>
  );
}

