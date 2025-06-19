import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute  top-0"
        onClick={() => {
          props.setVehiclePanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>

      <div 
        className="flex border-2 active:border-black  rounded-xl mb-2 items-center justify-between w-full p-3"
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.setVehiclePanel(false);
        }}
      >
        <img
          className="h-12"
          src="https://imgs.search.brave.com/J29-RibWmFJtLmWYNeMVjjVKFPlE2rbkcYHgNNepbGs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzYv/MzMxLzU2My9zbWFs/bC95ZWxsb3ctdGF4/aS1jYXItcG5nLnBu/Zw"
          alt=""
        />

        <div className=" ml-2 w-1/2">
          <h4 className="font-medium text-base">
            Uber Go{" "}
            <span>
              <i className="ri-user-3-fill">4</i>
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 min away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable,Compact rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">$192.2</h2>
      </div>

      <div 
        className="flex border-2 active:border-black  rounded-xl mb-2 items-center justify-between w-full p-3"
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.setVehiclePanel(false);
        }}
      >
        <img
          className="h-12"
          src="https://imgs.search.brave.com/mDAJkTzxBp1PBEe8weuikDE-CE_vqcmeG3ZKWtNS_L0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHNkLXByZW1pdW0v/cGVzc29hbC1kZS1l/bnRyZWdhcy1hLWFu/ZGFyLWRlLW1vdG9j/aWNsZXRhLWlsdXN0/cmFjYW8tcG5nLWlz/b2xhZGEtZW0tZnVu/ZG8tdHJhbnNwYXJl/bnRlXzEzMTE4MjIt/MzUzMy5qcGc_c2Vt/dD1haXNfaHlicmlk/Jnc9NzQw"
          alt=""
        />

        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">
            Moto
            <span>
              <i className="ri-user-3-fill">1</i>
            </span>
          </h4>
          <h5 className="font-medium text-sm">5 min away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable,Compact rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">$62</h2>
      </div>

      <div 
        className="flex border-2 active:border-black  rounded-xl mb-2 items-center justify-between w-full p-3"
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.setVehiclePanel(false);
        }}
      >
        <img
          className="h-12"
          src="https://imgs.search.brave.com/iPSe48vu81jUZyzdCoRB_Z25fyc2V8Mg-xjzfHXkOHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTkv/MjE4LzgyNC9zbWFs/bC9jb2xvcmZ1bC10/dWstdHVrLWluLWEt/Y2l0eS1wbmcucG5n"
          alt=""
        />

        <div className=" ml-2 w-1/2">
          <h4 className="font-medium text-base">
            Auto
            <span>
              <i className="ri-user-3-fill">3</i>
            </span>
          </h4>
          <h5 className="font-medium text-sm">1 min away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable,Compact rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">$110.5</h2>
      </div>
    </div>
  )
}

export default VehiclePanel