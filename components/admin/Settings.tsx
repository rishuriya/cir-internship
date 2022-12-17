import React from "react";
import { useEffect, useMemo, useState } from "react";
import SchoolAddPopup from "./SchoolAddPopup";
import { AiOutlineLoading3Quarters, AiOutlineDownload } from "react-icons/ai";
import { useTable, useGlobalFilter, useFilters, usePagination } from "react-table";
import { GrAddCircle } from "react-icons/gr";
import { ColumnFilter } from "./ColumnFilter";
import { MdRowing, MdDelete } from "react-icons/md";

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
    school_name: "School of Engineering",
    branch: "CSE",
    course: "B.Tech",
  },
  {
    school_name: "School of Engineering",
    branch: "CSE",
    course: "B.Tech",
  },
  {
    school_name: "School of Engineering",
    branch: "CSE",
    course: "B.Tech",
  },
  {
    school_name: "School of Engineering",
    branch: "CSE",
    course: "B.Tech",
  },
];

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
        <SchoolAddPopup closeModal={setOpenModal} />
      )}
      {!empty && !loading ? (
        <div className="table max-w-5xl md:max-w-7xl mx-auto">
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
                <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      key={i}
                      scope="col"
                      className="text-xl text-center font-semibold text-gray-900 px-7 py-3 "
                      {...column.getHeaderProps()}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          className="text-xl text-center font-semibold text-gray-900 px-7 py-3"
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <AiOutlineLoading3Quarters
            size={50}
            className="animate-spin text-primary"
          />
          <span className="text-xl text-primary">Loading...</span>
        </div>
      )}
    </>
  );
}