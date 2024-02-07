import React from 'react'

export default function ToggleButtonGroup({ value, onChange, options }) {
  return (
    <div
      className="inline-flex rounded-md shadow-sm transition duration-300 ease-in-out"
      role="group"
    >
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onChange(index)}
          type="button"
          className={`${
            index === value ? '!bg-white text-black border-white' : 'text-white bg-transparent'
          } border border-white px-4 py-1 text-md font-medium hover:bg-neutral-300 hover:border-neutral-300 hover:text-black   transition duration-300 ease-in-out ${index === 0 ? 'rounded-l-md' : ''} ${index === options.length - 1 ? 'rounded-r-md' : ''} `}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
