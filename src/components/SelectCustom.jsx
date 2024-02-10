import React, { useEffect, useRef, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

export default function SelectCustom({
  error,
  label,
  name,
  value,
  tipo = 'blanco',
  sx = '',
  labelSx = '',
  options,
  onChange,
  ...props
}) {
  const [inputStyle, setInputStyle] = useState('')
  const [labelStyle, setLabelStyle] = useState('')

  useEffect(() => {
    switch (tipo) {
      case 'verde':
        setInputStyle('ring-main-400 focus:ring-main-500 !text-main-900')
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
        setLabelStyle('text-black')
        break
      default:
        setInputStyle('bg-main-100 text-main-800 text-black')
        setLabelStyle('text-black')
        break
    }
  }, [tipo])

  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleChangeValue = (option) => {
    let event = {
      target: {
        value: option.value,
        name: name,
      },
    }
    onChange(event)
    setIsOpen(false)
  }
  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div
      ref={containerRef}
      className={
        `relative block w-full mt-0 h-full ${labelStyle} ${labelSx} ` + (label ? ' mb-3' : 'mb-0')
      }
    >
      {label}
      <button
        onClick={toggleOpen}
        className={`shadow-xs placeholder:text-gray block w-full text-black text-start
        bg-white rounded-md border-0 px-3 py-2  ring-inset relative
        focus:outline-none focus:ring-2 focus:ring-inset
        sm:text-sm sm:leading-6 appearance-none  ${inputStyle} ${sx}`}
      >
        {options.find((opt) => opt.value == value)
          ? options.find((opt) => opt.value == value).label
          : ''}
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          {isOpen ? (
            <KeyboardArrowUpIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          ) : (
            <KeyboardArrowDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow">
          {options.map((option, idx) => (
            <button
              key={option.value}
              onClick={() => handleChangeValue(option)}
              className={
                'block w-full text-sm text-left px-3 py-2 text-black hover:bg-main-300 ' +
                (value == option.value ? 'bg-main-200 ' : '') +
                (idx == 0 ? 'rounded-t-md ' : '') +
                (idx == options.length - 1 ? 'rounded-b-md ' : '')
              }
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
