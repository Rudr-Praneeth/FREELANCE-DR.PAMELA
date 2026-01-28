import React from 'react'

const Gutters = ({children}) => {
  return (
    <div className='flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent'>
        {children}
    </div>
  )
}

export default Gutters