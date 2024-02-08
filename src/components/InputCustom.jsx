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

  useEffect(() => {
    switch (tipo) {
      case 'verde':
        setInputStyle('ring-main-400 focus:ring-main-500 text-main-900')
        setLabelStyle('text-white')
        break
      case 'rojo':
        setInputStyle('ring-red-600 focus:ring-red-500')
        setLabelStyle('text-red-800')
        break
      case 'blanco':
        setInputStyle('bg-white ring-main-600 focus:ring-main-500')
        setLabelStyle('text-white')
        break
      case 'negro':
        setInputStyle('bg-white text-black ring-neutral-300 focus:ring-main-400')
        setLabelStyle('text-white')
        break
      case 'border-black':
        setInputStyle('bg-white text-black ring-neutral-700 focus:ring-black ring-2')
        setLabelStyle('')
        break
      default:
        setInputStyle('bg-main-100 text-main-800 text-black')
        setLabelStyle('text-black')
        break
    }
  }, [tipo])

  return (
    <>
      {label != null ? (
        <label
          className={`mb-2 block text-md font-medium w-full ${labelStyle} ${labelSx}`}
          htmlFor={props.id}
        >
          {label}
          <div className="relative">
            <input
              {...props}
              className={`shadow-xs placeholder:text-gray block w-full text-main-900
           bg-white rounded-md border-0 px-3 py-2 ring-inset 
          focus:outline-none focus:ring-2 focus:ring-inset disabled:opacity-60 
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
            className={`shadow-xs placeholder:text-gray block w-full text-main-900
           bg-white rounded-md border-0 px-3 py-2 ring-inset relative
          focus:outline-none focus:ring-2 focus:ring-inset disabled:opacity-60 
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
