import React from "react";

export const ColumnFilter = ({ column }) => {

    const { filterValue, setFilter } = column;
    return (
        <span>
        <input
            value={filterValue || ""}
            onChange={(e) => setFilter(e.target.value) || undefined}
            className="border-2 border-primaryDark rounded-lg px-2 py-1 font-light text-sm focus:outline-none focus:drop-shadow-lg w-40"
            placeholder="Search"
        />
        </span>
    );
};