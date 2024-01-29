import React, { useEffect, useState } from 'react'

export default function InputCustom({
  error,
  label,
  tipo = 'blanco',
  sx = '',
  labelSx = '',
  ...props
}) {
  const [inputStyle, setInputStyle] = useState('')
  const [labelStyle, setLabelStyle] = useState('')

  useEffect(() => {
    switch (tipo) {
      case 'verde':
        setInputStyle('ring-main-400 focus:ring-main-500 text-main-900')
        setLabelStyle('text-main-800')
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
        setLabelStyle('text-black')
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
          <input
            {...props}
            className={`shadow-xs placeholder:text-gray block w-full
           bg-white rounded-md border-0 px-3 py-2 ring-2 ring-inset 
          focus:outline-none focus:ring-2 focus:ring-inset disabled:opacity-60 
          sm:text-sm sm:leading-6  ${inputStyle} ${sx}`}
          />
          {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
        </label>
      ) : (
        <input
          {...props}
          className={`shadow-xs placeholder:text-gray block w-full 
           bg-white rounded-md border-0 px-3 py-2 ring-2 ring-inset 
          focus:outline-none focus:ring-2 focus:ring-inset disabled:opacity-60 
          sm:text-sm sm:leading-6  ${inputStyle} ${sx}`}
        />
      )}
    </>
  )
}
