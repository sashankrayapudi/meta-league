import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles'
import { styled } from '@mui/system';
import { AppBar, IconButton, Collapse} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ToolBar from '@mui/material/Toolbar';

import { Link as Scroll } from 'react-scroll';

import BasicMenu from '../BasicMenu/BasicMenu'

// const useStyles = makeStyles((theme) => ({
//   appbar: {
//     color: 'secondary'
//   },
//   icon: {
//     color: '#fff',
//   }
// }))

const RootDiv = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  fontFamily: 'Nunito',
})

const MyAppBar = styled(AppBar)({
  background: 'none',
  fontFamily: 'Nunito'
})

const MyToolBar = styled(ToolBar)({
  width:'80%',
  margin: '0 auto'
})


const Title = styled('h1')({
  flexGrow: '1'
}) 

const MySpan = styled('span')({
  color: '#9932CC',
  // color: '#5AFF3D'
})

const WelcomeDiv = styled('div')({
  textAlign: 'center',
  borderColor: 'black'
})

const Welcome = styled('h1')({
  color: '#fff',
  fontSize: '4.5rem',
  
})

const GoDown = styled(ExpandMoreIcon)({
  color: '#9932CC',
  fontSize: '5rem'
})

export default function Header() {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, [])
  return (
    <RootDiv id="header">
      <MyAppBar elevation={0}>
        <MyToolBar>
          <Title><MySpan>Meta</MySpan> League</Title>
          <BasicMenu/>
        </MyToolBar>
      </MyAppBar>
      <Collapse in={checked} {... (checked ? { timeout: 1000 } : {})}>
        <WelcomeDiv>
          <Welcome>
            Welcome to <br />
            <MySpan>Meta League</MySpan>
          </Welcome>
          <Scroll to="landing-cards" smooth={true}>
            <IconButton>
              <GoDown />
            </IconButton>
          </Scroll>
        </WelcomeDiv>
      </Collapse>
    </RootDiv>
  )
}