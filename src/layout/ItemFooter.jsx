import React from 'react'
import { Link } from 'react-router-dom'
import useStore from '../store/GeneralStore'

export default function ItemFooter({ item, index }) {
  const currentTab = useStore((state) => state.currentTab)
  const setCurrentTab = useStore((state) => state.setCurrentTab)
  return (
    <Link
      className={
        'h-full text-3xl w-20 flex flex-col justify-center mx-1 rounded font-medium py-2 transition duration-700 cursor-pointer z-50' +
        (index === currentTab ? ' text-xl' : '')
      }
      onClick={() => setCurrentTab(index)}
      to={item.link}
    >
      <div
        className={
          'flex flex-col items-center transition-all duration-700 ' +
          (index === currentTab ? 'text-2xl justify-center ' : 'text-3xl pt-4')
        }
      >
        <ion-icon name={index === currentTab ? item.iconSelected : item.icon}></ion-icon>
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
  )
}
