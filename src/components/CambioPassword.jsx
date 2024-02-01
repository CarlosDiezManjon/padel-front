import React, { useState } from 'react'
import InputCustom from './InputCustom'
import ButtonCustom from './ButtonCustom'

export default function CambioPassword({ goBack }) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
    if (password !== e.target.value) {
      setConfirmPasswordError('Las contraseñas no coinciden')
    } else {
      setConfirmPasswordError('')
    }
  }
  const handlePasswordChange = (e) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/
    const isValidPassword = passwordRegex.test(e.target.value)
    setPassword(e.target.value)

    if (!isValidPassword) {
      // Handle invalid password error
      setPasswordError(
        'La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.',
      )
    } else {
      setPasswordError('')
    }
  }

  const handleSave = () => {
    // Logic to save the new email
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Cambio contraseña</h1>
      <InputCustom
        required
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={handlePasswordChange}
        error={passwordError}
      />

      <InputCustom
        required
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        autoComplete="off"
        value={confirmPassword}
        error={confirmPasswordError}
        onChange={handleConfirmPasswordChange}
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
