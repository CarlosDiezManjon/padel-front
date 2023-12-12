import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, CardActionArea, Paper } from '@mui/material';
import { greyColor, mainColor } from '../constants';
import { ButtonCard } from './StyledComponents';


export default function HomeButton({title, onClick, image}) {
  return (
    <ButtonCard>
      <CardActionArea onClick={onClick} sx={{width:"100%", height:"100%"}}>
        <CardMedia image={image} height="190px" component="img"/>
        <CardContent sx={{display: "flex", alignItems:"baseline", justifyContent:"center"}}>
          {/* <Avatar sx={{color:mainColor, bgcolor: greyColor}}>{icon}</Avatar> */}
          <Typography variant="h5" component="div" >
            {title}
          </Typography>

        </CardContent>
      </CardActionArea>
    </ButtonCard>
  )
}
