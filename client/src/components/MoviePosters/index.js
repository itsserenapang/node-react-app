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


export default function MoviePosters() {
    const [links, setLinks ] = React.useState([])
    
    React.useEffect(() => {
        // const serverURL = ""
        const serverURL = "http://ec2-18-188-101-79.us-east-2.compute.amazonaws.com:3035"; //enable for deployed mode; Change PORT to the port number given to you;

        async function loadMovies() {
            const url = serverURL + "/api/getMoviePosters"
            const response = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              }
            })
            const movieList = await response.json()
            setLinks(movieList)
            console.log(links)
          }
          loadMovies()
    }, [])


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
            <h1>Movie Posters</h1>
{
    links.map((link) => {
        return (<div>
            <h1>{link.name}</h1>
            <img src={link.poster_link}></img>

        </div>)
    })
}
        </Grid>
    </div>
  )
}
