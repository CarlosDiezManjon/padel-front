import React, { useEffect } from 'react'

const ButtonCustom = React.forwardRef(({ tipo = 'primary', badge, sx, ...props }, ref) => {
  const [style, setStyle] = React.useState('')

  useEffect(() => {
    switch (tipo) {
      case 'primary':
        setStyle('text-background dark:text-text bg-primary hover:bg-accent  disabled:hover:none')
        break
      case 'secondary':
        setStyle(
          'text-secondary bg-background dark:bg-text dark:text-primary dark:ring-0 hover:bg-secondary dark:hover:bg-light hover:text-background  disabled:hover:none ring-2 ring-secondary ring-inset',
        )
        break
      case 'outlined':
        setStyle(
          'text-primary bg-transparent dark:ring-0 dark:bg-text dark:hover:text-primary hover:bg-secondary dark:hover:bg-light hover:text-background  disabled:hover:none ring-2 ring-primary ring-inset',
        )
        break
      case 'accent':
        setStyle('text-text bg-red-500 hover:bg-red-700 hover:text-text ')
        break

      case 'icon':
        setStyle(
          'text-main-500 !rounded-full border-2 border-main-500 hover:bg-main-200 hover:!text-main-500 items-center justify-center !w-fit',
        )
        break
      default:
        setStyle('border-2 text-text hover:bg-text')
        break
    }
  }, [tipo])

  return (
    <button
      ref={ref}
      className={`flex w-full  items-center 
      justify-center rounded-md px-3 py-1 text-base font-medium leading-6 focus-visible:outline focus-visible:outline-2
      focus-visible:outline-offset-2 transition duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed ${style} ${sx}`}
      {...props}
    >
      {props.children}
    </button>
  )
})
export default ButtonCustom
