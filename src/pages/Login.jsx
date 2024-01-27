import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonCustom from '../components/ButtonCustom'
import InputCustom from '../components/InputCustom'
import { baseUrl } from '../constants'
import useLoginRequest from '../services/login.service'
import useStore from '../store/GeneralStore'
import { parseJwt } from '../utils/utils'

export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const setToken = useStore((state) => state.setToken)
  const setUser = useStore((state) => state.setUser)
  const setAxios = useStore((state) => state.setAxios)
  const { login, data } = useLoginRequest()
  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())
    login(data)
  }

  const goToRegister = () => {
    navigate('/registro')
  }

  useEffect(() => {
    if (data) {
      setToken(data)
      setUser(parseJwt(data))
      localStorage.setItem('token', data)
      const axiosInstance = axios.create({
        baseURL: baseUrl,
        headers: { Authorization: `Bearer ${data}` },
      })
      setAxios(axiosInstance)
    }
  }, [data])
  return (
    <div
      className="from-black to-semiblack text-white flex h-full min-h-full flex-col 
    justify-center bg-gradient-to-r px-6 py-12 lg:px-8 w-full"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=white&shade=600"
          alt="Your Company"
        /> */}
        <h2 className=" mt-10 text-center text-4xl font-bold leading-9 tracking-tight">Padel</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <InputCustom
            required
            id="username"
            label="Usuario"
            name="username"
            autoComplete="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputCustom
            required
            name="password"
            label="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
          />

          <ButtonCustom type="submit">Entrar</ButtonCustom>
        </form>

        <div className="mt-6">
          <button
            type="button"
            onClick={goToRegister}
            className="border-2 text-white hover:bg-white-500 focus-visible:outline-white flex w-full justify-center 
            rounded-md px-3 py-1.5 text-base font-medium leading-6 shadow-sm focus-visible:outline focus-visible:outline-2
             focus-visible:outline-offset-2"
          >
            Registrarse
          </button>
        </div>

        <p className="text-gray-500 mt-10 text-center text-base font-medium">
          Olvidaste la contraseña?
          <a href="#" className="text-white-600 hover:text-white-500 font-semibold leading-6 pl-2">
            Recuperar contraseña
          </a>
        </p>
      </div>
    </div>
  )
}
