import React, { useEffect, useState } from 'react'

export default function BadgeCustom({ tipo, label, sx }) {
  const [style, setStyle] = useState('')

  useEffect(() => {
    switch (tipo) {
      case 'verde':
        setStyle('bg-main-500 text-white')
        break
      case 'rojo':
        setStyle('bg-red-500 text-white')
        break
      case 'amarillo':
        setStyle('bg-yellow-100 text-yellow-800')
        break
      case 'azul':
        setStyle('bg-blue-500 text-white')
        break
      case 'blanco':
        setStyle('bg-white text-black')
        break
      case 'transparente':
        setStyle('bg-transparent text-white border-2 border-white')
        break
      default:
        setStyle('bg-white text-black')
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
