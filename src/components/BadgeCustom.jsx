import React, { useEffect, useState } from 'react'

export default function BadgeCustom({ tipo, label, sx }) {
  const [style, setStyle] = useState('')

  useEffect(() => {
    switch (tipo) {
      case 'verde':
        setStyle('bg-main-500 text-white')
        break
      case 'rojo':
        setStyle('bg-red-100 text-red-800')
        break
      case 'amarillo':
        setStyle('bg-yellow-100 text-yellow-800')
        break
      case 'azul':
        setStyle('bg-blue-500 text-white')
        break
      default:
        setStyle('bg-gray-100 text-gray-800')
        break
    }
  }, [])

  return (
    <span className={`text-sm font-medium px-2.5 py-0.5 rounded-xl ${style} ${sx}`}>{label}</span>
  )
}
