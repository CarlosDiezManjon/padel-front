import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AutocompleteCustom from '../../components/AutocompleteCustom'
import ButtonCustom from '../../components/ButtonCustom'
import InputCustom from '../../components/InputCustom'
import ToggleButtonGroup from '../../components/ToggleButtonGroup'
import useGetRequest from '../../services/get.service'
import usePostRequest from '../../services/post.service'
import useStore from '../../store/GeneralStore'
import { dateUTCToLocalDateOnly, dateUTCToLocalTime } from '../../utils/utils'
import ReservaItem from './ReservaItem'

export default function Reserva() {
  const [saldo, setSaldo] = useState(0)
  const [total, setTotal] = useState(0)

  const [tabActive, setTabActive] = useState(0)
  const [motivo, setMotivo] = useState('')
  const [errorMotivo, setErrorMotivo] = useState(null)
  const user = useStore((state) => state.user)
  const [errorUser, setErrorUser] = useState(null)
  const [usuarios, setUsuarios] = useState([])
  const [usuarioSelected, setUsuarioSelected] = useState(null)
  const reservasSelected = useStore((state) => state.reservasSelected)
  const clearReservasSelected = useStore((state) => state.clearReservasSelected)
  const clearReservasToCancel = useStore((state) => state.clearReservasToCancel)
  const { getRequest, data } = useGetRequest()

  const { postRequest, data: dataPost } = usePostRequest()
  const navigate = useNavigate()

  useEffect(() => {
    if (user.tipo != 0) {
      getRequest('/saldo')
    } else {
      getRequest('/active-usuarios')
      setUsuarioSelected(user)
    }
  }, [])

  useEffect(() => {
    if (usuarioSelected != null && user.tipo == 0) {
      getRequest('/saldo-usuario/' + usuarioSelected.id)
    }
  }, [usuarioSelected])

  useEffect(() => {
    if (reservasSelected.length != 0) {
      setTotal(
        reservasSelected.reduce((acc, reserva) => acc + parseFloat(reserva.tarifa.precio), 0),
      )
    }
  }, [reservasSelected])

  useEffect(() => {
    if (data) {
      if (data.saldo != null) {
        console.log(data)
        setSaldo(parseFloat(data.saldo))
      } else if (data.usuarios != null) {
        console.log(data)
        setUsuarios([...data.usuarios])
      } else if (data.tarifa) {
      }
    }
  }, [data])

  const handleChangeMotivo = (e) => {
    setMotivo(e.target.value)
    if (e.target.value == '') {
      setErrorMotivo('El motivo es obligatorio')
    } else {
      setErrorMotivo(null)
    }
  }

  const handleConfirmar = () => {
    if (user.tipo == 0) {
      if (tabActive == 0) {
        if (motivo == '') {
          setErrorMotivo('El motivo es obligatorio')
          return
        } else {
          setErrorMotivo(null)
        }
      } else {
        if (usuarioSelected == null) {
          setErrorUser('El usuario es obligatorio')
          return
        } else {
          setErrorUser(null)
        }
      }
    }
    let reservaToServer = [...reservasSelected]
    reservaToServer.forEach((reserva) => {
      delete reserva.pista.parrilla
    })
    let importeTotal = reservaToServer.reduce(
      (acc, reserva) => acc + parseFloat(reserva.tarifa.precio),
      0,
    )
    postRequest('/reservas', {
      reservas: reservaToServer,
      importeTotal: importeTotal,
      motivo: motivo,
      forUser: usuarioSelected,
    })
  }

  useEffect(() => {
    if (dataPost) {
      clearReservasToCancel()
      clearReservasSelected()
      navigate(-1)
      setMotivo('')
    }
  }, [dataPost])

  return (
    <div className="w-full p-2 py-0">
      {reservasSelected.length != 0 ? (
        <>
          {user.tipo == 0 ? (
            <div className="flex flex-col text-white mb-2 justify-center items-center">
              <h5 className="font-medium text-2xl mb-1 text-white text-center">
                Reserva Administrador
              </h5>

              <ToggleButtonGroup
                value={tabActive}
                onChange={setTabActive}
                options={['Cierre pista', 'Reserva para cliente']}
              />
              {tabActive == 0 ? (
                <InputCustom
                  label="Motivo de cierre"
                  name="motivo"
                  placeholder="Limpieza, mantenimiento, etc."
                  value={motivo}
                  onChange={handleChangeMotivo}
                  error={errorMotivo}
                  sx="w-full md:!mt-2"
                  labelSx="mt-2 md:!text-2xl "
                />
              ) : (
                <AutocompleteCustom
                  label="Usuario"
                  options={usuarios}
                  value={usuarioSelected}
                  onChange={setUsuarioSelected}
                  sx="!w-full mt-2"
                  error={errorUser}
                  nullable
                />
              )}
            </div>
          ) : (
            <h5 className="font-medium text-2xl mb-4 text-white text-center">
              Aquí tienes tu reserva {user.nombre}
            </h5>
          )}

          <ul className="max-h-reserva min-h-reserva overflow-auto">
            {reservasSelected
              .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
              .map((reserva, index) => (
                <ReservaItem
                  key={reserva.startTime + '-' + index}
                  reservaSelected={reserva}
                  usuarioSelected={usuarioSelected}
                />
              ))}
          </ul>

          <p className="my-1 text-right text-white pr-1 text-lg">Importe total: {total} €</p>
          <p className="my-1 text-right text-white pr-1 text-lg">Saldo actual: {saldo} €</p>

          <p className="my-1 text-right text-white pr-1 text-lg">
            Saldo tras reserva: {saldo - total} €
          </p>

          {total > saldo && user.tipo != 0 && (
            <div className="w-full flex justify-end my-1">
              <p className="my-2 text-red-600">Saldo insuficiente</p>
              <ButtonCustom
                onClick={() => setSaldo(saldo + 100)}
                tipo="text-white"
                sx="max-w-48 ml-2"
              >
                Añadir saldo
              </ButtonCustom>
            </div>
          )}

          <div className="flex justify-end mt-3">
            <ButtonCustom onClick={() => navigate(-1)} sx="mr-4" tipo="red">
              Cancelar
            </ButtonCustom>
            <ButtonCustom
              disabled={(total > saldo && user.tipo != 0) || reservasSelected.length == 0}
              onClick={handleConfirmar}
            >
              Confirmar
            </ButtonCustom>
          </div>
        </>
      ) : (
        <h5 className="font-bold text-2xl mb-4 text-white text-center">
          No hay reservas {user.nombre}
        </h5>
      )}
    </div>
  )
}
