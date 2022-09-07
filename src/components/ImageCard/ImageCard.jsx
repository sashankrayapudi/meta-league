import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Collapse, CardActionArea } from '@mui/material'

import jj from '../../assets/jj.jpg'
import ad from '../../assets/ad.jpg'

export default function ImageCard({ cardInfo, checked }) {
  return (
    <Collapse in={checked} {... (checked ? { timeout: 1000 } : {})}>
    
    <Card sx={{ maxWidth: 625, background: "rgba(0,0,0,0.7)", margin: '20px'}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="340"
          image={cardInfo.title === 'About Us' ? jj : ad}
          alt="jetts"
          sx={{transition: "transform 0.15s ease-in-out",
          "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },}}
        />
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h1" fontFamily='Nunito'
        fontWeight='bold' fontSize='2rem' color='#fff'>
          {cardInfo.title}
        </Typography>
        <Typography variant="body2" color="#ddd" fontFamily="Nunito"
        fontSize='1.1rem' >
          {cardInfo.desc}
        </Typography>
      </CardContent>
    </Card>
    </Collapse>
  );
}