import React, { useEffect } from 'react'

const ButtonCustom = React.forwardRef(({ tipo = 'green', sx, ...props }, ref) => {
  const [style, setStyle] = React.useState('')

  useEffect(() => {
    switch (tipo) {
      case 'green':
        setStyle(
          'text-white bg-main-500 hover:bg-main-700  disabled:hover:bg-main-500 disabled:hover:text-white',
        )
        break
      case 'red':
        setStyle('text-white bg-red-500 hover:bg-red-700 hover:text-white ')
        break
      case 'white':
        setStyle('text-white border-2 hover:bg-neutral-700 hover:!text-white')
        break
      case 'white-green':
        setStyle('text-main-500 border-2 border-main-500 hover:bg-main-200 hover:text-main-500')
        break
      case 'white-red':
        setStyle('text-red-500 border-2 border-red-500 hover:bg-red-200 hover:text-red-500')
        break
      default:
        setStyle('border-2 text-white hover:bg-white')
        break
    }
  }, [tipo])

  return (
    <button
      ref={ref}
      className={`flex w-full 
      justify-center rounded-md px-3 py-1 text-base font-medium leading-6 focus-visible:outline focus-visible:outline-2
      focus-visible:outline-offset-2 transition duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed ${style} ${sx}`}
      {...props}
    >
      {props.children}
    </button>
  )
})
export default ButtonCustom
