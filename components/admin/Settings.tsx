import React from "react";
import { useEffect, useMemo, useState } from "react";
import SchoolAddPopup from "./SchoolAddPopup";
import { AiOutlineLoading3Quarters, AiOutlineDownload } from "react-icons/ai";
import { useTable, useGlobalFilter, useFilters, usePagination } from "react-table";
import { GrAddCircle } from "react-icons/gr";
import { ColumnFilter } from "./ColumnFilter";
import { MdRowing, MdDelete } from "react-icons/md";
import { CSVLink } from "react-csv";
import GlobalFilter from "./GlobalFilter";

const tableColumns = [
  {
    Header: "School",
    accessor: "school_name",
    Filter: ColumnFilter,
  },
  {
    Header: "Course",
    accessor: "course",
    Filter: ColumnFilter,
  },
  {
    Header: "Branch",
    accessor: "branch",
    Filter: ColumnFilter,
  },
];

const headers = [
  { label: "School", key: "school_name" },
  { label: "Course", key: "course" },
  { label: "Branch", key: "branch" },
  { label: "Semester", key: "semester" },
]

export default function TableDashboard() {
  const [loading, setLoading] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [data, setData] = useState([]);
  const [show, setShow] = React.useState(false);
  const [modal, setModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [StudentDetail, setStudentDetail] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [pageUpdate, setPageUpdate] = useState(false);
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
    try {
      setLoading(true);
      fetch("/api/student/showBranch", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        const resData = await res.json();
        if (resData.success) {
          setData(resData.branch);
          setLoading(false);
        }
        else {
          setEmpty(true);
          setLoading(false);
        }
      });
      setLoading(false);

    } catch (e) {
      setLoading(false);
      console.log("error", e);
    }
  }, [pageUpdate]);
  useEffect(() => {
    updateData(page);
  }, [page]);

  function deleteBranch(e,id){
    e.preventDefault();
    console.log(id);
    const bodyObj = {
      _id:id["_id"],
      course:id["course"],
      school_name:id["school_name"],
      branch:id["branch"],
    }
    fetch(`/api/admin/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObj),
    }).then((res) => {
      if (res.status === 200) {
        setPageUpdate(!pageUpdate);
      }
    });
  }

  function updateData(page) {
    let tempData = [];
    page.map((row, id) => {
      tempData[id] = row.original
    })
    setCsvData(tempData)
  }

  function StudentDetails() {
    // let a = row.original;
    // setCourseDetail(a);
    setOpenModal(true);
  }

  return (
    <>
      {openModal && (
        <SchoolAddPopup closeModal={setOpenModal} />
      )}
      <div className="flex flex-row justify-between">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        {/* <StudentDetailsModal /> */}
        <div className="px-1 py-2 bg-slate-200/60 rounded-md hover:bg-slate-300/60 cursor-pointer my-2">
          <CSVLink
            filename={"InternshipApproved.csv"}
            data={csvData}
            // onClick={() => setCsvData(page)}
            headers={headers}
            className="mr-2 flex flex-row">
            <AiOutlineDownload className="fill-black ml-1 mr-2 " size={26} />
            Download Table
          </CSVLink>
        </div>
      </div>
      {(!empty && loading === false) ? <div className="table max-w-5xl md:max-w-7xl mx-auto border-2 rounded-xl py-2 my-3 bg-gray-50">
          <div
            className="flex flex-row justify-start items-center w-28 md:w-40 border-2 border-primary rounded-lg py-1 px-2 hover:bg-slate-200 hover:cursor-pointer"
            onClick={() => StudentDetails()}
          >
            <GrAddCircle
              size={26}
              className="p-2 h-10 w-10 mx-2 cursor-pointer rounded-lg "
            />
            <span>Add Course</span>
          </div>
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
                      {...column.getHeaderProps()}
                    >
                      {column.render("Header")}
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    </th>
                  ))}

                  {
                    <th
                      id="4"
                      className="text-lg text-center font-medium text-gray-900 px-3 py-4 pb-14 min-w-[150px]"
                      scope="col"
                    >
                      Action
                    </th>
                  }
                </tr>
              </React.Fragment>
            ))}
          </thead>
          <tbody className="divide-y-2 bg-white truncate" {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr  key={i} {...row.getRowProps()}>
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

                  <td className="text-center rounded-lg mx-7 items-center justify-center whitespace-nowrap text-grey-700 py-1 px-4">
                    <button onClick={(e) =>deleteBranch(
                      e,
                      data[i]
                    )}>
                        
                      <div className="flex flex-row right-0 bg-slate-300/30 px-2 py-1 my-2 rounded-md">
                        <MdDelete className="fill-black " size={28} />
                        <p className="text-sm mx-1 mt-1 ">Letter Template</p>
                      </div>
                    </button></td>
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
                [5, 10, 20, 50].map(pageSize => (
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
      </div> : (loading === true ? <div className="flex justify-center items-center">
        <div className="">
          <AiOutlineLoading3Quarters className="animate-spin fill-primary" size={42} />
        </div>
      </div> : <div className="flex justify-center items-center my-10">
        <h1 className="text-2xl font-bold">No Pending Internships.</h1>
      </div>)
      }
    </>
  );
}
