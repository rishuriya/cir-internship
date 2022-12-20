import React from "react";
import { useEffect, useMemo, useState } from "react";
import SchoolAddPopup from "./SchoolAddPopup";
import { AiOutlineLoading3Quarters, AiOutlineDownload } from "react-icons/ai";
import { useTable, useGlobalFilter, useFilters, usePagination } from "react-table";
import { GrAddCircle } from "react-icons/gr";
import { ColumnFilter } from "./ColumnFilter";
import { MdDelete } from "react-icons/md";
import GlobalFilter from "./GlobalFilter";

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


export default function TableDashboard() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [pageUpdate, setPageUpdate] = useState(false);
  const columns = useMemo(() => tableColumns, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useFilters, useGlobalFilter, usePagination);

  const { globalFilter } = state;


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

  function courseAddition() {
    setOpenModal(true);
  }

  return (
    <>
      {openModal && (
        <SchoolAddPopup closeModal={setOpenModal} setUpdateTable={setPageUpdate} updateTable={pageUpdate}/>
      )}
      <div className="flex flex-row justify-between">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          <div
            className="flex flex-row justify-start items-center w-28 md:w-40 border-2 border-primary rounded-lg py-1 px-2 hover:bg-slate-100 hover:cursor-pointer"
            onClick={() => courseAddition()}
          >
            <GrAddCircle
              size={26}
              className="p-2 h-10 w-10 ml-2 cursor-pointer rounded-lg "
            />
            <span>Add Course</span>
          </div>
      </div>
      {(!empty && loading === false) ? <div className="table max-w-5xl md:max-w-7xl mx-auto border-2 rounded-xl py-2 my-3 bg-gray-50">
        
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <React.Fragment key={i}>
                <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      key={i}
                      scope="col"
                      className="text-lg text-center font-medium text-gray-900 px-6 py-4 min-w-[200px]"
                      {...column.getHeaderProps()}
                    >
                      {column.render("Header")}
                      
                    </th>
                  ))}

                  {
                    <th
                      id="4"
                      className="text-lg text-center font-medium text-gray-900 px-3 py-4  min-w-[180px]"
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
                        
                      <div className="flex flex-row right-0 bg-red-200/30 border-2 border-red-300 hover:bg-red-200/70 px-2 py-1 my-2 rounded-md">
                        <MdDelete className="fill-red-500 " size={28} />
                        <p className="text-sm mx-1 mt-1 ">Letter Template</p>
                      </div>
                    </button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
