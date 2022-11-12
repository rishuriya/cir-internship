import { FiSearch } from "react-icons/fi"

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span className="flex flex-row items-center">
      <FiSearch className=" mr-2" size={28}/>
        <input
            value={filter || ''}
            onChange={e => {setFilter(e.target.value || undefined)}}
            className="border-2 border-primaryDark rounded-xl px-3 py-2 focus:outline-none focus:shadow-xl"
            placeholder="Search"
        />
    </span>
  )
}

export default GlobalFilter
