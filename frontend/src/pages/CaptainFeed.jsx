import React from 'react'
import { useSelector } from 'react-redux'

const CaptainFeed = () => {

  const captain=useSelector(store=>store.captain)

  return (
    <div>
      <h2>{captain.vehicle.vehicleType}</h2>
    </div>
  )
}

export default CaptainFeed