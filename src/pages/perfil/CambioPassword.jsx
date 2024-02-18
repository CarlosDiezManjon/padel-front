import React, { useEffect, useState } from 'react'
import InputCustom from '../../components/InputCustom'
import ButtonCustom from '../../components/ButtonCustom'
import usePutRequest from '../../services/put.service'

export default function CambioPassword({ goBack }) {
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [newPasswordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const { putRequest, data } = usePutRequest()

  const handleOldPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
    if (newPassword !== e.target.value) {
      setConfirmPasswordError('Las contraseñas no coinciden')
    } else {
      setConfirmPasswordError('')
    }
  }
  const handlePasswordChange = (e) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/
    const isValidPassword = passwordRegex.test(e.target.value)
    setNewPassword(e.target.value)

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
    putRequest('/cambiar-password', { password, newPassword })
  }

  useEffect(() => {
    if (data) {
      goBack(false, true)
    }
  }, [data])

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-regular mb-4">Cambio contraseña</h1>
      <InputCustom
        label="Contraseña actual"
        name="password"
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={handleOldPasswordChange}
      />
      <InputCustom
        label="Contraseña nueva"
        name="password"
        type="password"
        autoComplete="new-password"
        value={newPassword}
        onChange={handlePasswordChange}
        error={newPasswordError}
      />

      <InputCustom
        name="confirmPassword"
        label="Confirmar contraseña nueva"
        type="password"
        autoComplete="new-password"
        value={confirmPassword}
        error={confirmPasswordError}
        onChange={handleConfirmPasswordChange}
      />

      <div className="flex justify-end mt-4 w-full">
        <ButtonCustom onClick={() => goBack(false, false)} sx="mx-1 max-w-32" tipo="secondary">
          Cancelar
        </ButtonCustom>
        <ButtonCustom
          onClick={handleSave}
          sx="mx-1 max-w-32"
          tipo="primary"
          disabled={
            newPasswordError ||
            confirmPasswordError ||
            password === '' ||
            confirmPassword === '' ||
            newPassword === ''
          }
        >
          Guardar
        </ButtonCustom>
      </div>
    </div>
  )
}
