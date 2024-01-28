import React from 'react'
import ButtonCustom from '../components/ButtonCustom'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  return (
    <div>
      Home
      <ButtonCustom onClick={() => navigate('/parrillas')} tipo="green">
        Reservas
      </ButtonCustom>
    </div>
  )
}
