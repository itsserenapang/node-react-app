import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import Paper from "@material-ui/core/Paper";
import { FormLabel } from '@material-ui/core';
import {Link} from 'react-router-dom'
import AppBar from "@material-ui/core/AppBar";


export default function index() {
  return (
    <div>
        <AppBar position="static">
            <h1>Sereana Very Swag B)</h1>
            <Link to="/">
                Home
            </Link>
            <Link to="/search">
                search
            </Link>
            <Link to="/reviews">
                reviews
            </Link>
            <Link to="/moviePosters">
                movie reviews
            </Link>
      </AppBar>
      landing
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <h1>Welcome to serena's movie review website</h1>
            <Link to="/search">
                <h1>search</h1>
            </Link>
            <Link to="/reviews">
                <h1>reviews</h1>
            </Link>
            <Link to="/moviePosters">
                <h1>movie reviews</h1>
            </Link>
            <img src="https://www.giantbomb.com/a/uploads/scale_small/15/159969/3282450-chungus.png"></img>
        </Grid>
    </div>
  )
}
