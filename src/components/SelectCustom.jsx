import React, { useEffect, useState } from 'react'

export default function SelectCustom({
  error,
  value,
  tipo = 'blanco',
  sx = '',
  labelSx = '',
  options,
  ...props
}) {
  const [inputStyle, setInputStyle] = useState('')
  const [labelStyle, setLabelStyle] = useState('')

  useEffect(() => {
    switch (tipo) {
      case 'verde':
        setInputStyle('ring-main-400 focus:ring-main-500 !text-main-900')
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
        setInputStyle('bg-white text-main-800 ring-gray-500 focus:ring-black')
        setLabelStyle('text-black')
        break
      default:
        setInputStyle('bg-main-100 text-main-800 text-black')
        setLabelStyle('text-black')
        break
    }
  }, [tipo])

  return (
    <label
      for={props.name}
      className={`mb-2 block text-md font-medium w-full ${labelStyle} ${labelSx}`}
    >
      {props.label}
      <select
        {...props}
        id={props.name}
        className={`shadow-xs placeholder:text-gray block w-full text-black
        bg-white rounded-md border-0 px-3 py-2 ring-2 ring-inset 
       focus:outline-none focus:ring-2 focus:ring-inset  
       sm:text-sm sm:leading-6 appearance-none  ${inputStyle} ${sx}`}
      >
        {options.map((opt) => {
          return <option value={opt.value}>{opt.label}</option>
        })}
      </select>
    </label>
  )
}
