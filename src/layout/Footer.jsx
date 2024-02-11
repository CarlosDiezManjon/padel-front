import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useStore from '../store/GeneralStore'

export default function Footer() {
  const currentTab = useStore((state) => state.currentTab)
  const setCurrentTab = useStore((state) => state.setCurrentTab)
  const user = useStore((state) => state.user)
  const state = useStore((state) => state)

  const handleChangeTab = useCallback((index) => {
    setCurrentTab(index)
  }, [])

  useEffect(() => {
    console.log('loading', state.isLoading)
    console.log('currentTab', state.currentTab)
  }, [state])

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
      link: '/administracion',
      admin: true,
    },
  ]

  return (
    <div className="fixed top-auto bottom-0 h-16 text-white w-full flex justify-center py-1 z-50 border-t-2">
      <div className="flex">
        {listFooter
          .filter((item) => (user.tipo === 0 ? true : item.admin === false))
          .map((item, index) => (
            <Link
              key={index}
              className={
                'h-full text-3xl w-20 flex flex-col justify-center mx-1 rounded font-medium py-2 transition duration-700 cursor-pointer z-50' +
                (index === currentTab ? ' text-xl' : '')
              }
              onClick={() => handleChangeTab(index)}
              to={item.link}
            >
              <div
                className={
                  'flex flex-col items-center transition-all duration-700 ' +
                  (index === currentTab ? 'text-2xl justify-center ' : 'text-3xl pt-4')
                }
              >
                <ion-icon name={item.icon}></ion-icon>
                <span
                  className={
                    index === currentTab
                      ? 'transform translate-y-0.5 opacity-1 text-base'
                      : 'transform translate-y-4 opacity-0 ' +
                        'transition-all duration-700 text-base flex transform translate-y-6'
                  }
                >
                  {item.label}
                </span>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}
