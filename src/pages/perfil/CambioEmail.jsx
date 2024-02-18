import React, { useEffect, useState } from 'react'
import InputCustom from '../../components/InputCustom'
import ButtonCustom from '../../components/ButtonCustom'
import usePutRequest from '../../services/put.service'
import useStore from '../../store/GeneralStore'

export default function CambioEmail({ email, goBack }) {
  const [newEmail, setNewEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const { putRequest, data } = usePutRequest()

  const handleEmailChange = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValidEmail = emailRegex.test(e.target.value)
    setNewEmail(e.target.value)

    if (!isValidEmail) {
      // Handle invalid email error
      setEmailError('El email no es válido')
    } else if (e.target.value == email) {
      setEmailError('El email es igual al actual')
    } else {
      setEmailError('')
    }
  }

  useEffect(() => {
    if (data) {
      goBack(newEmail, false)
    }
  }, [data])

  const handleSave = () => {
    putRequest('/cambiar-email', { email: newEmail })
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-regular mb-4">Cambio email</h1>
      <InputCustom
        value={newEmail}
        placeholder="Intruzca el nuevo email"
        type="email"
        tipo="negro"
        onChange={handleEmailChange}
        error={emailError}
      />

      <div className="flex justify-end mt-4 w-full">
        <ButtonCustom onClick={() => goBack(false, false)} sx="mx-1 max-w-32" tipo="text-white">
          Cancelar
        </ButtonCustom>
        <ButtonCustom
          onClick={handleSave}
          sx="mx-1 max-w-32"
          tipo="green"
          disabled={newEmail == '' || emailError != ''}
        >
          Guardar
        </ButtonCustom>
      </div>
    </div>
  )
}
