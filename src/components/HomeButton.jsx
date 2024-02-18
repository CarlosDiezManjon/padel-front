import React from 'react'

export default function HomeButton({ title, onClick, image, last }) {
  return (
    <div
      className={
        `bg-secondary pb-4 mr-3 md:mr-6 mt-4 w-60 h-60 shadow-md shadow-light hover:bg-accent dark:hover:bg-primary dark:shadow-none rounded-md transition-all 
    duration-300 transform hover:scale-105 flex flex-col cursor-pointer lg:mb-0 ` +
        (last ? 'mb-8' : '')
      }
      onClick={onClick}
    >
      <div className=" w-full">
        <div className="image ">
          <img src={image} alt="" className="w-full h-40 object-cover rounded-t-md" />
        </div>
        <div className="w-full">
          <h3 className="mt-4 text-background dark:text-text text-2xl truncate text-center">
            {title}
          </h3>
        </div>
      </div>
    </div>
  )
}
