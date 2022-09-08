import * as React from 'react';
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material'
import SortIcon from '@mui/icons-material/Sort'

import LeaguesMenu from '../LeaguesMenu';
import NestedMenuItem from "material-ui-nested-menu-item";


export default function BasicMenu({ setUser, leagues }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <SortIcon sx = {{color:"white", fontSize:'2rem'}} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {/* <MenuItem onClick={handleClose}><LeagueAccordion /></MenuItem> */}
        <LeaguesMenu leagues={leagues} />
        <MenuItem to='' onClick={handleLogOut} sx ={{fontSize: '15px'}}>LOGOUT</MenuItem>
      </Menu>
    </div>
  );
}


