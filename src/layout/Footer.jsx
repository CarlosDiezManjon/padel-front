import React from 'react'
import { useNavigate } from 'react-router-dom'
import useStore from '../store/GeneralStore'
import './Footer.css'

export default function Footer() {
  const currentTab = useStore((state) => state.currentTab)
  const setCurrentTab = useStore((state) => state.setCurrentTab)
  const user = useStore((state) => state.user)
  const navigate = useNavigate()
  const handleChangeTab = (item, index) => {
    navigate(item.link)
    setCurrentTab(index)
  }
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
  // Reemplaza esto con tu lista de enlaces

  return (
    // <div className="navigation" id="footer" style={{ top: 'auto', bottom: 0 }}>
    //   <ul>
    //     {listFooter
    //       .filter((item) => (user.tipo == 2 ? true : item.admin === false))
    //       .map((item, index) => (
    //         <li
    //           key={index}
    //           className={index === currentTab ? 'list active' : 'list'}
    //           onClick={() => handleChangeTab(item, index)}
    //         >
    //           <div>
    //             <span className="icon">
    //               <ion-icon name={item.icon}></ion-icon>
    //             </span>
    //             <span className="text">{item.label}</span>
    //           </div>
    //         </li>
    //       ))}
    //     <div className="indicator"></div>
    //   </ul>
    // </div>
    <div className="fixed top-auto bottom-0 h-16 text-white bg-transparent from-black to-semiblack w-full flex justify-center py-1 z-50">
      <div className="flex just">
        {listFooter
          .filter((item) => (user.tipo == 0 ? true : item.admin === false))
          .map((item, index) => (
            <li
              key={index}
              className={
                'h-full  w-20 flex flex-col justify-center mx-1 rounded font-medium py-2 transition duration-500 cursor-pointer text-3xl z-50' +
                (index === currentTab ? ' text-xl' : '')
              }
              onClick={() => handleChangeTab(item, index)}
            >
              <div
                className={
                  'flex flex-col items-center transition-all duration-500 ' +
                  (index === currentTab ? 'text-2xl justify-center ' : 'text-3xl pt-4')
                }
              >
                <ion-icon name={index === currentTab ? item.iconSelected : item.icon}></ion-icon>
                <span
                  className={
                    index === currentTab
                      ? 'transform translate-y-0.5 opacity-1 text-base font-medium '
                      : 'transform translate-y-4 opacity-0 ' +
                        'transition-all duration-500 text-base flex transform translate-y-6'
                  }
                >
                  {item.label}
                </span>
              </div>
            </li>
          ))}
        <div
          className={
            'h-14 w-16 rounded bg-transparent from-main-600 to-main-400 absolute z-1 transition duration-500 ' +
            (currentTab == 0
              ? 'first'
              : currentTab == 1
                ? 'second'
                : currentTab == 2
                  ? 'third'
                  : 'fourth')
          }
        ></div>
      </div>
    </div>
  )
}
