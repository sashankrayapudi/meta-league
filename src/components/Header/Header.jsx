import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles'
import { styled } from '@mui/system';
import { AppBar, IconButton, Collapse} from '@mui/material'
import SortIcon from '@mui/icons-material/Sort'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ToolBar from '@mui/material/Toolbar';

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
  fontFamily: 'Nunito'
})

const MyAppBar = styled(AppBar)({
  background: 'none',
  fontFamily: 'Nunito'
})

const MyToolBar = styled(ToolBar)({
  width:'80%',
  margin: '0 auto'
})

const MyIconButton = styled(IconButton)({
})

const MySortIcon = styled(SortIcon)({
  color: 'white',
  fontSize: '2rem',
})

const MyTitle = styled('h1')({
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
    <RootDiv>
      <MyAppBar elevation={0}>
        <MyToolBar>
          <MyTitle><MySpan>Meta</MySpan> League</MyTitle>
          <IconButton>
            <MySortIcon />
          </ IconButton>
        </MyToolBar>
      </MyAppBar>
      <Collapse in={checked} {... (checked ? { timeout: 1000 } : {})} collapsedHeight={50}>
        <WelcomeDiv>
          <Welcome>
            Welcome to <br />
            <MySpan>Meta League</MySpan>
          </Welcome>
          <IconButton>
            <GoDown />
          </IconButton>
        </WelcomeDiv>
      </Collapse>
    </RootDiv>
  )
}