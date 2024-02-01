import React from 'react'
import ButtonCustom from '../components/ButtonCustom'
import { useNavigate } from 'react-router-dom'
import HomeButton from '../components/HomeButton'

export default function Home() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col h-full items-center justify-center">
      <HomeButton title="Reservas" onClick={() => navigate('/parrillas')} image="./padel.jpg" />
      <HomeButton title="Cartera" onClick={() => navigate('/cartera')} image="./cartera.png" />
      {/* <HomeButton title="Cancelaciones" onClick={() => navigate('/parrillas')} />
      <HomeButton title="Reservas" onClick={() => navigate('/parrillas')} />
      <HomeButton title="Reservas" onClick={() => navigate('/parrillas')} />
      <HomeButton title="Reservas" onClick={() => navigate('/parrillas')} />
      <HomeButton title="Reservas" onClick={() => navigate('/parrillas')} /> */}
    </div>
  )
}
