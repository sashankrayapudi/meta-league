import { useEffect, useState } from 'react';
import { Link as Scroll } from 'react-scroll';

import { makeStyles } from '@mui/styles'
import { styled } from '@mui/system';
import { AppBar, IconButton, Collapse} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ToolBar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';


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
  color: '#BA55D3',
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
  color: '#BA55D3',
  fontSize: '8rem'
})

export default function Header({ user, setUser, leagues, theme }) {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, [])
  return (
    <ThemeProvider theme={theme}>
    <RootDiv id="header">
      <MyAppBar elevation={0}>
        <MyToolBar>
          <Title>Good Evening <MySpan>{user.name}</MySpan></Title>
          <BasicMenu setUser={setUser} leagues={leagues} />
        </MyToolBar>
      </MyAppBar>
      <Collapse in={checked} {... (checked ? { timeout: 1000 } : {})}>
        <WelcomeDiv>
          <Welcome>
            Welcome to<br />
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
    </ThemeProvider>
  )
}