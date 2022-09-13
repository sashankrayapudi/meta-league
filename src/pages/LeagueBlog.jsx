

import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BasicMenu from '../components/BasicMenu/BasicMenu'
import SleeperUserForm from '../components/SleeperUserForm'
import ListItems from '../components/ListItems';

import FormControl from "@mui/material/FormControl";
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button'
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as leaguesAPI from '../utilities/leagues-api'
import * as postsAPI from '../utilities/posts-api'
import * as userService from '../utilities/users-service';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Meta League
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

export default function LeagueBlog({ setUser }) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [league, setLeague] = useState(null);
  let { sleeperUser, leagueId } = useParams();
  useEffect(function() {
    async function getLeague() {
      const leagueData = await leaguesAPI.getLeague(sleeperUser, leagueId);
      // console.log(leagueData)
      setLeague(leagueData)
    }
    getLeague()
  }, [])


  const [posts, setPosts] = useState([])

  useEffect(function() {
    async function getPosts() {
      const posts = await postsAPI.getAll(leagueId);
      // console.log(posts)
      setPosts(posts);
    }
    getPosts();
  }, [])

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    handleAddPost(title, body)
  }

  
  async function handleAddPost(postTitle, postBody) {
    const postData = {title: postTitle, body: postBody}
    const post = await postsAPI.add(postData, leagueId)
    // console.log(posts)
    setPosts([...posts,post])
  }

  async function handleDeletePost(postId) {
    const posts = await postsAPI.deletePost(postId, leagueId)
    setPosts(posts)
  }


  return (
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                <p>{league && league.name} Blog</p>
              </Typography>
              {/* <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}
              <BasicMenu sleeperUser={sleeperUser} setUser={setUser} />
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <ListItems sleeperUser={sleeperUser} leagueId={leagueId}/>
              {/* <Divider sx={{ my: 1 }} />
              {secondaryListItems} */}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      // height: 640,
                    }}
                  >
                    {/* <Chart /> */}
                    <h2 style={{textAlign: 'center'}}>Blog</h2>
                    {/* <h1>{JSON.stringify(posts)}</h1> */}
                    {posts.map((post, idx) => 
                      <Paper key={idx} elevation={12} sx={{margin: '1rem', backgroundColor: 'rgb(64,64,64)', color: 'white'}} >
                        <h3>{post.title}</h3> <hr />
                        <p>{post.body}</p> 
                        <p>{post.createdAt}</p>
                        <Button onClick={() => handleDeletePost(post._id)}>Delete</Button>
                      </Paper>
                    )}
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                    {/* <Deposits /> */}
                    <h3 style={{textAlign: 'center'}}>Archives</h3>
                  </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    {/* <Orders /> */}
                    <h3 style={{textAlign: 'center'}}>Add New Blog Post</h3>
                    <form  style={{display: 'inline-block', textAlign: 'center'}} onSubmit={handleSubmit} autoComplete="off">
                      <FormControl>
                        <FormLabel sx={{marginBottom: '1rem'}}>Post Title</FormLabel>
                        <TextField
                          required
                          id="outlined-required"
                          label="Required"
                          sx={{marginBottom: '2rem', width: '25rem'}}
                          value={title}
                          onChange={e => setTitle(e.target.value)}
                        />
                        <FormLabel sx={{marginBottom: '1rem'}}>Content</FormLabel>
                        <TextField
                          id="filled-multiline-static"
                          label="Multiline"
                          multiline
                          rows={4}
                          variant="filled"
                          sx={{marginBottom: '2rem'}}
                          value={body}
                          onChange={e => setBody(e.target.value)}
                        />
                        <Button type="submit" variant="contained" sx={{marginBottom: '1.5rem'}}>Add Post</Button>
                      </FormControl>
                    </form>
                  </Paper>
                </Grid>
              </Grid>
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
        {/* <h1>{JSON.stringify(league)}</h1> */}
      </ThemeProvider>
  );
}

// export default function LeaguePage() {
//   return <DashboardContent />;
// }