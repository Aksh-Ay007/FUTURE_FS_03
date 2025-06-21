import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const ConfirmRidePopUp = (props) => {
    console.log('ConfirmRidePopUp props:', props);

    const [otp, setOtp] =useState('')

    const submitHandler = (e) => {
        e.preventDefault();
        // Here you can handle the OTP submission logic
        console.log('OTP submitted:', e.target[0].value);
        // Close the confirm ride popup after submission
    }

    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setConfirmRidePopupPanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>
            <div className='flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 rounded-full object-cover w-12' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
                    <h2 className='text-lg font-medium capitalize'>{props.ride?.user?.name || 'Rahul Sharma'}</h2>
                </div>
                <h5 className='text-lg font-semibold'>{props.ride?.distance || '2.2 KM'}</h5>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{props.ride?.pickup?.address || '562/11-A'}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup?.location || 'Marine Drive, Kochi'}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{props.ride?.destination?.address || '789/12-C'}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination?.location || 'MG Road, Ernakulam'}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare || '185'}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Payment</p>
                        </div>
                    </div>
                </div>
                <div className='mt-6 w-full'>
                    <form onSubmit={(e)=>{
                        submitHandler(e);
                    }}>
                        <input 
                        value={otp}
onChange={(e) => setOtp(e.target.value)}

                            type="text"
                            className='bg-[#eee] px-6 py-2 font-mono text-base rounded-lg w-full'
                            placeholder='Enter OTP'
                        />
                        
                        <Link 
                            to='/captain-riding' 
                            className='w-full mt-5 flex justify-center text-base bg-green-600 text-white font-semibold p-2 px-10 rounded-lg'>
                            Confirm
                        </Link>
                        
                        <button
                            type="button"
                            onClick={() => {
                                props.setConfirmRidePopupPanel(false)
                                props.setRidePopupPanel(false)
                            }}
                            className='w-full mt-2 bg-red-600 text-base text-white font-semibold p-2 px-10 rounded-lg'>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopUp