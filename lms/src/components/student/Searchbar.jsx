import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Searchbar = ({ data }) => {
  const navigate = useNavigate()

  const [inuput, setInput] = useState(data ? data : '')

  const handleSearch = (e) => {
    e.preventDefault()

    navigate('/course-list/' + inuput)

    setInput('')
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10">
      
      {/* Search Box */}
      <form
        onSubmit={handleSearch}
        className="mx-auto -mt-8 flex w-full max-w-3xl flex-col items-stretch gap-3 rounded-2xl bg-white p-3 shadow-xl sm:flex-row sm:items-center"
      >
        
        {/* Search Icon + Input */}
        <div className="flex flex-1 items-center rounded-xl border border-gray-200 px-3">
          <img
            src={assets.search_icon}
            alt="Search"
            className="h-5 w-5 opacity-70"
          />

          <input
            onChange={(e) => setInput(e.target.value)}
            type="search"
            value={inuput}
            placeholder="Search for courses..."
            className="w-full bg-transparent px-3 py-3 text-sm outline-none sm:text-base"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto"
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default Searchbar