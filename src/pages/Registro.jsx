import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonCustom from '../components/ButtonCustom'
import InputCustom from '../components/InputCustom'
import useRegisterRequest from '../services/registro.service'
import useStore from '../store/GeneralStore'

const Registro = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')
  const setError = useStore((state) => state.setError)
  const { register, data } = useRegisterRequest()

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
        'La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número',
      )
    } else {
      setPasswordError('')
    }
  }

  const handleEmailChange = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValidEmail = emailRegex.test(e.target.value)
    setEmail(e.target.value)

    if (!isValidEmail) {
      // Handle invalid email error
      setEmailError('El email no es válido')
    } else {
      setEmailError('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    register(data)
  }

  useEffect(() => {
    if (data) {
      setError({
        message: 'Se ha enviado un email de confirmación a ' + email,
        tipo: 'registro',
      })
      navigate('/')
    }
  }, [data])

  const goToLogin = () => {
    navigate('/')
  }

  return (
    <div
      className="flex h-full min-h-full flex-col 
    justify-center px-6 py-12 lg:px-8 w-full"
    >
      {data ? (
        <Typography component="h1" variant="h5">
          Registro correcto, se ha enviado un email de confirmación.
        </Typography>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-white  text-center text-4xl font-bold leading-9 tracking-tight mb-10">
            Registro
          </h2>

          <InputCustom
            required
            label="Nombre de usuario"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputCustom
            name="nombre"
            required
            label="Nombre"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputCustom
            name="apellidos"
            required
            label="Apellidos"
            autoComplete="off"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <InputCustom
            name="email"
            required
            label="Email"
            type="email"
            autoComplete="off"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
          />
          <InputCustom
            name="telefono"
            required
            label="Teléfono"
            autoComplete="off"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <InputCustom
            required
            label="Contraseña"
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
            label="Confirmar contraseña"
            type="password"
            autoComplete="off"
            value={confirmPassword}
            error={confirmPasswordError}
            onChange={handleConfirmPasswordChange}
          />

          <ButtonCustom
            type="submit"
            disabled={
              username === '' ||
              password === '' ||
              confirmPassword === '' ||
              confirmPasswordError !== '' ||
              name === '' ||
              surname === '' ||
              email === '' ||
              phone === ''
            }
          >
            Registrarse
          </ButtonCustom>

          <ButtonCustom onClick={() => goToLogin()} tipo="white" sx="mt-6">
            Volver al login
          </ButtonCustom>
        </form>
      )}
    </div>
  )
}

export default Registro
