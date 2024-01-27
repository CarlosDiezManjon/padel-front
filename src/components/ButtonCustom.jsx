import React, { useEffect } from 'react'

const ButtonCustom = React.forwardRef(({ type = 'green', sx, ...props }, ref) => {
  const [style, setStyle] = React.useState('')

  useEffect(() => {
    switch (type) {
      case 'green':
        setStyle(
          'text-white bg-main-500 hover:bg-main-700  disabled:hover:bg-main-500 disabled:hover:text-white',
        )
        break
      case 'red':
        setStyle(
          'text-white bg-red-500 hover:bg-red-700 hover:text-white group-hover:bg-main-500 group-hover:text-white',
        )
        break
      default:
        setStyle(
          'bg-main-500 hover:bg-white hover:text-green-700 group-hover:bg-white group-hover:text-green-700',
        )
        break
    }
  }, [style])

  return (
    <button
      ref={ref}
      className={`flex w-full 
      justify-center rounded-md px-3 py-1.5 text-base font-medium leading-6 focus-visible:outline focus-visible:outline-2
      focus-visible:outline-offset-2 transition duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed ${style} ${sx}`}
      {...props}
    >
      {props.children}
    </button>
  )
})
export default ButtonCustom
