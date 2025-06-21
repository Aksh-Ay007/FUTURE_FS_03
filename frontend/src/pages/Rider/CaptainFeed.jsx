import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import CaptainDetails from '../../components/Captain/CaptainDetails'
import RidePopUp from '../../components/Captain/RidePopUp'
import ConfirmRidePopUp from '../../components/Captain/ConfirmRidePopUp'
import { useSelector } from 'react-redux'

const CaptainFeed = () => {
    const [ridePopupPanel, setRidePopupPanel] = useState(false)
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
    const ridePopupPanelRef = useRef(null)
    const confirmRidePopupPanelRef = useRef(null)
    const [ride, setRide] = useState({
        user: { name: 'Rahul Sharma' },
        pickup: { address: '562/11-A', location: 'Marine Drive, Kochi' },
        destination: { address: '789/12-C', location: 'MG Road, Ernakulam' },
        fare: 185,
        distance: '2.2 KM'
    })

    const captain = useSelector(store => store.captain);
    console.log('Captain Feed Page Rendered', captain)

    // Fixed confirmRide function
    const confirmRide = () => {
        console.log('Ride confirmed')
        setConfirmRidePopupPanel(true)
    }

    useGSAP(function () {
        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ridePopupPanel])

    useGSAP(function () {
        if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePopupPanel])

    return (
        <div className="h-screen relative">
            <div className='fixed p-6 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to='/captain-feed' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>

            <div className='h-3/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>

            <div className='h-2/5 p-6'>
                <CaptainDetails />
            </div>

            {/* Fixed: Added onClick to trigger popup for testing */}
            <div 
                onClick={() => setRidePopupPanel(true)}
                className='fixed bottom-20 right-6 bg-green-500 text-white p-4 rounded-full cursor-pointer'
            >
                🚗
            </div>

            <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <RidePopUp
                    ride={ride}
                    setRidePopupPanel={setRidePopupPanel}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    confirmRide={confirmRide}
                />
            </div>

            <div ref={confirmRidePopupPanelRef} className='fixed w-full  z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <ConfirmRidePopUp
                    ride={ride}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    setRidePopupPanel={setRidePopupPanel}
                />
            </div>
        </div>
    )
}

export default CaptainFeed