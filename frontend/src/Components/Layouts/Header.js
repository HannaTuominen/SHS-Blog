import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';

function Header() {
  return <div>
  <AppBar position="static">
    <Toolbar>
      {/* <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
      > */}
        {/* <MenuIcon /> */}
      {/* </IconButton> */}
      <Typography variant="h2" noWrap>
        SHS-Blogs
      </Typography>

          {/* <SearchIcon /> */}
        <InputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
    </Toolbar>
  </AppBar>
</div>
}

export default Header;