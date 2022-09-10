import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import LeaguePage from '../pages/LeaguePage'

import * as leaguesAPI from '../utilities/leagues-api'

export default function LeaguesMenu({ sleeperUser }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [leagues, setLeagues] = useState([]);
  useEffect(function() {
    async function getLeagues() {
      const leagues = await leaguesAPI.getUserLeagues(sleeperUser)
      setLeagues(leagues)
      console.log(leagues)
    }
    getLeagues();
  }, [])

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx = {{ color: '#9932CC'}}
      >
        My Leagues
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
        <div>
          { sleeperUser ?
            <>
              {leagues.map((league, idx) => 
                <MenuItem key={idx} ><a href={`leagues/${sleeperUser}/${league.league_id}`}>{league.name}</a></MenuItem>
              )}
            </>
            : 
            <p>Enter Sleeper Username</p>
          }
        </div>
      </Menu>
    </div>
  );
}
