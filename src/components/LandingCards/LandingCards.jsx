import { styled } from '@mui/system';
import ImageCard from '../ImageCard/ImageCard'
import cardInfo from '../../static/cardInfo'

import useWindowPosition from '../../hook/useWindowPosition';

const RootDiv = styled('div')( ({ theme }) => ({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    flexDirection: "column"
  }
}))



export default function LandingCards() {
  const checked = useWindowPosition('header');
  return (
  <RootDiv id="landing-cards">
    <ImageCard cardInfo={cardInfo[0]} checked={checked}/>
    <ImageCard cardInfo={cardInfo[1]} checked={checked}/>
  </RootDiv>
  );
}