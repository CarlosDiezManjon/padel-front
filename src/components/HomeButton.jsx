import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Avatar, CardActionArea, Paper } from '@mui/material'
import { greyColor, mainColor } from '../constants'
import { ButtonCard } from './StyledComponents'

export default function HomeButton({ title, onClick, image }) {
  return (
    <div
      className="bg-transparent pb-1.5 mr-3 md:mr-6 mt-4 w-80 h-60  shadow-2xl shadow-black rounded-md transition-transform 
    duration-300 transform hover:scale-105 flex flex-col  cursor-pointer"
      onClick={onClick}
    >
      <div className="px-2 w-full">
        <div className="image pt-2 ">
          <img src={image} alt="" className="w-full h-40 object-cover rounded-md" />
        </div>
        <div className="w-full">
          <h3 className="mt-4 text-white text-2xl truncate text-center">{title}</h3>
        </div>
      </div>
    </div>
  )
}
