import React, { useEffect, useState } from 'react'

export default function BadgeCustom({ tipo = 'primary', label, sx }) {
  const [style, setStyle] = useState('')

  useEffect(() => {
    switch (tipo) {
      case 'primary':
        setStyle('bg-primary text-white')
        break
      case 'secondary':
        setStyle('bg-secondary text-white')
        break
      case 'green':
        setStyle('bg-green-500 text-white')
        break
      case 'red':
        setStyle('bg-red-400 text-white')
        break
      case 'outlined':
        setStyle('bg-transparent text-text border-2 border-primary')
        break
      case 'transparente':
        setStyle('bg-transparent text-text border-2 border-text')
        break
      default:
        setStyle('bg-primary text-black')
        break
    }
  }, [])

  return (
    <span
      className={`flex justify-center items-center text-sm font-medium px-2.5 py-0.5 rounded-xl ${style} ${sx}`}
    >
      {label}
    </span>
  )
}
