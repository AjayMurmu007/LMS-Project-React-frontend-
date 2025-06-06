import React from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({data}) => {

  const navigate = useNavigate();

  const [inputValue, setInputValue] = React.useState(data ? data : '');

  // Function to handle form submission
  const handleSubmit = (e) => {
    // Prevent default form submission
    e.preventDefault();
    // Navigate to the search results page with the input value
    // navigate(`/search?query=${inputValue}`);
    navigate('/course-list/' + inputValue);
    
  }

  // Handle input change
  const handleInputChange = (e) => {
    // Prevent form submission
    e.preventDefault();
    // Update the input value state
    setInputValue(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='max-w-xl w-full md:h-14 h-12 flex items-center justify-between bg-white border border-gray-300 rounded-lg shadow-md mx-auto '>
        <img src={assets.search_icon} alt='search icon' className='md:w-auto w-10 px-3' />
        <input
          value={inputValue}
          onChange={handleInputChange}
          type='text'
          placeholder='Search for courses, instructors, or topics...'
          // className='w-full md:w-96 h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
          className='w-full-h-full outline-none text-gray-500/80' />
          <button type='submit' className='bg-blue-600 rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1'>Search</button>
      </form>
    </div>
  )
}

export default SearchBar
