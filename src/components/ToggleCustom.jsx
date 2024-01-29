import React from 'react'

export default function ToggleCustom({ label, checked, onChange }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer transition-all duration-500">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />
      <div
        className="w-11 h-6 bg-neutral-500 rounded-full peer  
        transition-all duration-500
      peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
       peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5
        after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
         after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-main-500"
      ></div>
      <span className="ms-3 text-md  text-black">{label}</span>
    </label>
  )
}
