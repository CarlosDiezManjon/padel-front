import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useStore from '../store/GeneralStore'
import ItemFooter from './ItemFooter'

export default function Footer() {
  const user = useStore((state) => state.user)

  const listFooter = [
    {
      label: 'Inicio',
      icon: 'home-outline',
      iconSelected: 'home',
      link: '/',
      admin: false,
    },
    {
      label: 'Cartera',
      icon: 'wallet-outline',
      iconSelected: 'wallet',
      link: '/cartera',
      admin: false,
    },
    {
      label: 'Perfil',
      icon: 'person-outline',
      iconSelected: 'person',
      link: '/perfil',
      admin: false,
    },
    {
      label: 'Admin',
      icon: 'settings-outline',
      iconSelected: 'settings',
      link: '/gestion',
      admin: true,
    },
  ]

  return (
    <div className="fixed top-auto bottom-0 h-16 w-full flex justify-center py-1 z-50">
      <div className="flex">
        {listFooter
          .filter((item) => (user.tipo == 0 ? true : item.admin === false))
          .map((item, index) => (
            <ItemFooter key={index} item={item} index={index} />
          ))}
      </div>
    </div>
  )
}
