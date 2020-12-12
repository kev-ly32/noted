import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Grid,
  Box,
} from "@material-ui/core/";
import MenuIcon from "@material-ui/icons/Menu";

function Navbar(props) {
  return (
    <AppBar>
      <Toolbar>
        <Grid justify="space-between" container>
          <Box display="flex" alignItems="center">
            <Grid item>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Button color="inherit">Dashboard</Button>
            </Grid>
          </Box>
          <Box display="flex" alignItems="center">
            <Grid item>
              <Button color="inherit">Sign In</Button>
            </Grid>
            <Grid item>
              <Button color="inherit">Register</Button>
            </Grid>
          </Box>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
