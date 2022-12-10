import React from "react";
import { useEffect } from "react";
import { useMemo, useState } from "react";
import SchoolAddPopup from "./SchoolAddPopup";
import { AiOutlineLoading3Quarters ,AiOutlineDownload} from "react-icons/ai";
import { useTable, useGlobalFilter, useFilters, usePagination } from "react-table";
import {GrAddCircle} from "react-icons/gr";
import { ColumnFilter } from "./ColumnFilter";
import { MdRowing,MdDelete } from "react-icons/md";


const tableColumns = [
  {
    Header: "School",
    accessor: "school_name",
  },
  {
    Header: "Course",
    accessor: "course",
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


  function StudentDetails() {
    // let a = row.original;
    // setCourseDetail(a);
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
        <div className="flex flex-row justify-start items-center w-28 md:w-40 border-2 border-primary rounded-lg py-1 px-2 hover:bg-slate-200 hover:cursor-pointer"  onClick={() => StudentDetails()}>
          <GrAddCircle size={26} 
            className="p-2 h-10 w-10 mx-2 cursor-pointer rounded-lg "/>
            <span>
            Add Course
            </span>
        </div>
        <table {...getTableProps()} >
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <>
                <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      key={i}
                      scope="col"
                      className="text-xl text-center font-semibold text-gray-900 px-7 py-3 "
                      {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                  {
                    <th
                      id="4"
                      className="text-xl text-center font-semibold text-gray-900 px-3 py-4 "
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
                          key={i}
                          className="px-3 text-center text-lg font-medium text-gray-900 py-5"  
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                        
                      </>
                    );
                  })}
                  <div className="bg-red-50 border-2 border-red-400 px-2 py-1 mx-2 my-4 rounded-md hover:bg-red-100 hover:border-red-500">
                    <MdDelete className="fill-red-700 mx-auto" size={26}/>
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

