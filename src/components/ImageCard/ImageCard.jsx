import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import jj from '../../assets/jj.jpg'
import ad from '../../assets/ad.jpg'

export default function ImageCard({ cardInfo, im }) {
  return (
    <Card sx={{ maxWidth: 625, background: "rgba(0,0,0,0.5)", margin: '20px' }}>
      <CardMedia
        component="img"
        height="340"
        image={cardInfo.title === 'Green' ? jj : ad}
        alt="jetts"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h1" fontFamily='Nunito'
        fontWeight='bold' fontSize='2rem' color='#fff'>
          {cardInfo.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" fontFamily="Nunito"
        fontSize='1.1rem' color='#ddd' >
          {cardInfo.desc}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}