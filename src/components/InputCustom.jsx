import React from 'react'

export default function InputCustom({ error, sx, ...props }) {
  return (
    <>
      <label className="text-white mb-2 block text-sm font-medium" htmlFor={props.id}>
        {props.label}
        <input
          {...props}
          className={`shadow-xs ring-green placeholder:text-gray block w-full  
          text-black bg-white rounded-md border-0 px-3 py-2 ring-1 ring-inset 
          focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green 
          sm:text-sm sm:leading-6 ${sx}`}
        />
        {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
      </label>
    </>
  )
}
