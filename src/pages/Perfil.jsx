import React, { useEffect } from 'react'

export default function Perfil() {
  useEffect(() => {
    console.log('entro')
    //getRequest('/usuarios')
  }, [])
  return <div>Perfil</div>
}
