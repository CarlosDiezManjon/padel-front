import React, { useState } from 'react'
import InputCustom from './InputCustom'
import ButtonCustom from './ButtonCustom'

export default function CambioEmail({ email, goBack }) {
  const [newEmail, setNewEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const handleEmailChange = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValidEmail = emailRegex.test(e.target.value)
    setNewEmail(e.target.value)

    if (!isValidEmail) {
      // Handle invalid email error
      setEmailError('El email no es válido')
    } else {
      setEmailError('')
    }
  }

  const handleSave = () => {
    // Logic to save the new email
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Cambio email</h1>
      <InputCustom
        value={newEmail}
        type="email"
        tipo="negro"
        onChange={handleEmailChange}
        error={emailError}
      />

      <div className="flex justify-end mt-4 w-full">
        <ButtonCustom onClick={goBack} sx="mx-1 max-w-32" tipo={'text-white'}>
          Cancelar
        </ButtonCustom>
        <ButtonCustom onClick={handleSave} sx="mx-1 max-w-32" tipo="green">
          Guardar
        </ButtonCustom>
      </div>
    </div>
  )
}
