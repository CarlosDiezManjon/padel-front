import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useStore from '../store/GeneralStore'

export default function Footer() {
  const currentTab = useStore((state) => state.currentTab)
  const setCurrentTab = useStore((state) => state.setCurrentTab)
  const user = useStore((state) => state.user)

  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    setActiveTab(currentTab)
  }, [])

  const handleChangeTab = useCallback((index) => {
    setActiveTab(index)
    setCurrentTab(index)
  }, [])
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
    <div className="fixed top-auto bottom-0 h-16 text-white w-full flex justify-center py-1 z-50">
      <div className="flex just">
        {listFooter
          .filter((item) => (user.tipo == 0 ? true : item.admin === false))
          .map((item, index) => (
            <Link
              key={index}
              className={
                'h-full  w-20 flex flex-col justify-center mx-1 rounded font-medium py-2 transition duration-500 cursor-pointer z-50' +
                (index === activeTab ? ' text-xl' : '')
              }
              onClick={() => handleChangeTab(index)}
              to={item.link}
            >
              <div
                className={
                  'flex flex-col items-center transition-all duration-500 ' +
                  (index === activeTab ? 'text-2xl justify-center ' : 'text-3xl pt-4')
                }
              >
                <ion-icon name={index === activeTab ? item.iconSelected : item.icon}></ion-icon>
                <span
                  className={
                    index === activeTab
                      ? 'transform translate-y-0.5 opacity-1 text-base font-medium '
                      : 'transform translate-y-4 opacity-0 ' +
                        'transition-all duration-500 text-base flex transform translate-y-6'
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
