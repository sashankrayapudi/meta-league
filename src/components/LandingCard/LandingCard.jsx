import { styled } from '@mui/system';
import ImageCard from '../ImageCard/ImageCard'
import cardInfo from '../../static/cardInfo'

const RootDiv = styled('div')({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})



export default function LandingCard() {
  return <RootDiv>
    <ImageCard cardInfo={cardInfo[0]}/>
    <ImageCard cardInfo={cardInfo[1]}/>
  </RootDiv>
}