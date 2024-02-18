import React, { useEffect, useState } from 'react'

export default function InputCustom({
  error,
  label,
  tipo = 'blanco',
  sx = '',
  sufix,
  labelSx = '',
  ...props
}) {
  const [inputStyle, setInputStyle] = useState('')
  const [labelStyle, setLabelStyle] = useState('')

  return (
    <>
      {label != null ? (
        <label
          className={`mb-2 block text-md text-text font-medium w-full ${labelStyle} ${labelSx}`}
          htmlFor={props.id}
        >
          {label}
          <div className="relative">
            <input
              {...props}
              className={`shadow-xs placeholder:text-neutral-400 block w-full text-text dark:text-background 
              ring-inset ring-2 dark:ring-0 ring-secondary rounded-md border-0 px-3 py-2 
          focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary dark:focus:ring-0 dark:hover:ring-0 
          disabled:opacity-70 disabled:bg-neutral-200
          sm:text-sm sm:leading-6  ${inputStyle} ${sx}`}
            />
            {sufix != null && (
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-600 pointer-events-none">
                {sufix}
              </span>
            )}
          </div>
          {error != '' && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </label>
      ) : (
        <div className={`w-full relative ${labelSx}`}>
          <input
            {...props}
            className={`shadow-xs placeholder:text-neutral-400 block w-full text-text dark:text-background ring-inset ring-2
             dark:ring-0 ring-secondary rounded-md border-0 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset 
             focus:ring-primary dark:focus:ring-0 dark:hover:ring-0 disabled:opacity-70 disabled:bg-neutral-200 
            sm:text-sm sm:leading-6  ${inputStyle} ${sx}`}
          />
          {sufix != null && (
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 pointer-events-none">
              {sufix}
            </span>
          )}
          {error != '' && <p className="text-red-500 text-md  mt-1">{error}</p>}
        </div>
      )}
    </>
  )
}
