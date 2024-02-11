import React, { useEffect, useState } from 'react'
import ButtonCustom from '../components/ButtonCustom'
import { useNavigate } from 'react-router-dom'
import HomeButton from '../components/HomeButton'
import useGetRequest from '../services/get.service'

export default function Home() {
  const navigate = useNavigate()
  const { getRequest, data } = useGetRequest()
  const [actividades, setActividades] = useState([])

  useEffect(() => {
    getRequest('/actividades-activas')
  }, [])

  useEffect(() => {
    if (data) {
      setActividades(data.actividades)
    }
  }, [data])

  const getImage = (nombre) => {
    switch (nombre) {
      case 'Padel':
        return './padel.jpg'
      case 'Fútbol sala':
        return './futbolsala.jpg'
      case 'Baloncesto':
        return './baloncesto.jpg'
      case 'Solarium':
        return './solarium.jpg'
      default:
        return './padel.jpg'
    }
  }
  return (
    <div className="flex w-full flex-col items-center justify-start lg:flex-row lg:items-start lg:px-4 bg-transparent max-h-full overflow-auto">
      {actividades.map((actividad, index) => (
        <HomeButton
          last={index === actividades.length - 1}
          key={actividad.id}
          title={actividad.nombre}
          onClick={() => navigate(`/parrillas/${actividad.id}`)}
          image={getImage(actividad.nombre)}
        />
      ))}

      {/* <HomeButton title="Reservas" onClick={() => navigate('/parrillas')} image="./padel.jpg" />
      <HomeButton title="Cartera" onClick={() => navigate('/cartera')} image="./cartera.png" /> */}
    </div>
  )
}
