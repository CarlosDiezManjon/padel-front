import React from 'react'

export default function ToggleButtonGroup({ value, onChange, options }) {
  return (
    <div className="inline-flex rounded-md shadow-sm " role="group">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onChange(index)}
          type="button"
          className={`${
            index === value ? '!bg-primary text-background dark:text-text border-0' : 'text-primary'
          } border border-primary px-4 py-1 text-md font-medium hover:bg-light dark:hover:bg-light dark:text-primary dark:bg-text  ${index === 0 ? 'rounded-l-md' : ''} ${index === options.length - 1 ? 'rounded-r-md' : ''} `}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
