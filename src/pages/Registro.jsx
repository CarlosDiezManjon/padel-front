import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonCustom from '../components/ButtonCustom'
import InputCustom from '../components/InputCustom'
import useRegisterRequest from '../services/registro.service'

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
      navigate('/')
    }
  }, [data])

  const goToLogin = () => {
    navigate('/')
  }

  return (
    <div
      className="from-black to-semiblack text-white flex h-full min-h-full flex-col 
    justify-center bg-gradient-to-r px-6 py-12 lg:px-8 w-full"
    >
      {data ? (
        <Typography component="h1" variant="h5">
          Registro correcto, se ha enviado un email de confirmación.
        </Typography>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-gray-900  text-center text-4xl font-bold leading-9 tracking-tight mb-10">
            Registro
          </h2>
          <InputCustom
            required
            label="Username"
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
            label="Surname"
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
            label="Phone"
            autoComplete="off"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
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

          <div className="mt-6">
            <button
              type="button"
              onClick={() => goToLogin()}
              className="border-2 text-white hover:bg-white-500 focus-visible:outline-white flex w-full justify-center 
            rounded-md px-3 py-1.5 text-base font-medium leading-6 shadow-sm focus-visible:outline focus-visible:outline-2
             focus-visible:outline-offset-2"
            >
              Volver al login
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default Registro
