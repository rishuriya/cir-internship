const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span>
        Search :{' '}
        <input
            value={filter || ''}
            onChange={e => {setFilter(e.target.value || undefined)}}
        />
    </span>
  )
}

export default GlobalFilter
