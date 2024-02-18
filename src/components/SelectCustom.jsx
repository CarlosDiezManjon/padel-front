import React, { useEffect, useRef, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

export default function SelectCustom({
  error,
  label,
  name,
  value,
  tipo = 'primary',
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
      case 'primary':
        setInputStyle('ring-secondary focus:ring-primary !text-main-900')
        setLabelStyle('text-text')
        break
      case 'secondary':
        setInputStyle('ring-red-600 focus:ring-red-500')
        setLabelStyle('text-red-800')
        break
      default:
        setInputStyle('ring-primary focus:ring-primary !text-main-900')
        setLabelStyle('text-text')
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
        className={`shadow-xs placeholder:text-gray block w-full text-text dark:text-background text-start
        bg-background dark:bg-text rounded-md dark:ring-0 ring-secondary ring-2 px-3 py-2 ring-inset relative
        focus:outline-none focus:ring-2 focus:ring-inset sm:leading-6  ${inputStyle} ${sx}`}
      >
        {options.find((opt) => opt.value == value)
          ? options.find((opt) => opt.value == value).label
          : ''}
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          {isOpen ? (
            <KeyboardArrowUpIcon
              className="h-5 w-5 text-primary dark:text-background"
              aria-hidden="true"
            />
          ) : (
            <KeyboardArrowDownIcon
              className="h-5 w-5 text-primary dark:text-background"
              aria-hidden="true"
            />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow p-0">
          {options.map((option, idx) => (
            <button
              key={option.value}
              onClick={() => handleChangeValue(option)}
              className={
                'm-0 block w-full text-sm text-left px-3 py-2 text-black hover:bg-primary hover:text-background dark:hover:text-text dark:hover:bg-secondary ' +
                (value == option.value ? 'bg-secondary text-white dark:bg-primary ' : '') +
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
