import { styled } from '@mui/system';
import ImageCard from '../ImageCard/ImageCard'
import cardInfo from '../../static/cardInfo'
import { Link } from 'react-router-dom';

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
    <a href='https://sleeper.com/' target="_blank">
      <ImageCard cardInfo={cardInfo[0]} checked={checked}/>
    </a>
    <Link to='/leagues/dankShank/872719853050654720'>
      <ImageCard cardInfo={cardInfo[1]} checked={checked}/>
    </Link>
  </RootDiv>
  );
}