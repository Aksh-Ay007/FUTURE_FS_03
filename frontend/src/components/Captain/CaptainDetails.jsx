import React from 'react'
import { useSelector } from 'react-redux'

const CaptainDetails = () => {
  const captain = useSelector(store => store.captain);
  console.log(captain, 'captain details')

  // Return loading state if captain data is not available
  if (!captain) {
    return (
      <div className="animate-pulse">
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start gap-3'>
            <div className='h-10 w-10 bg-gray-300 rounded-full'></div>
            <div className='h-4 bg-gray-300 rounded w-32'></div>
          </div>
          <div>
            <div className='h-6 bg-gray-300 rounded w-20 mb-1'></div>
            <div className='h-3 bg-gray-300 rounded w-12'></div>
          </div>
        </div>
        <div className='flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start'>
          <div className='text-center'>
            <div className='h-8 w-8 bg-gray-300 rounded mx-auto mb-2'></div>
            <div className='h-4 bg-gray-300 rounded w-8 mx-auto mb-1'></div>
            <div className='h-3 bg-gray-300 rounded w-16 mx-auto'></div>
          </div>
          <div className='text-center'>
            <div className='h-8 w-8 bg-gray-300 rounded mx-auto mb-2'></div>
            <div className='h-4 bg-gray-300 rounded w-8 mx-auto mb-1'></div>
            <div className='h-3 bg-gray-300 rounded w-16 mx-auto'></div>
          </div>
          <div className='text-center'>
            <div className='h-8 w-8 bg-gray-300 rounded mx-auto mb-2'></div>
            <div className='h-4 bg-gray-300 rounded w-8 mx-auto mb-1'></div>
            <div className='h-3 bg-gray-300 rounded w-16 mx-auto'></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-start gap-3'>
          <img 
            className='h-10 w-10 rounded-full object-cover' 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s" 
            alt="Captain" 
          />
          <h4 className='text-lg font-medium capitalize'>
            {captain.firstName && captain.lastName 
              ? `${captain.firstName} ${captain.lastName}`
              : 'Captain Name'}
          </h4>
        </div>
        <div>
          <h4 className='text-xl font-semibold'>₹295.20</h4>
          <p className='text-sm text-gray-600'>Earned</p>
        </div>
      </div>
      <div className='flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start'>
        <div className='text-center'>
          <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
          <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'>Hours Online</p>
        </div>
        <div className='text-center'>
          <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
          <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'>Distance</p>
        </div>
        <div className='text-center'>
          <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
          <h5 className='text-lg font-medium'>15</h5>
          <p className='text-sm text-gray-600'>Rides</p>
        </div>
      </div>
    </div>
  )
}

export default CaptainDetails