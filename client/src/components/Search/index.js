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


export default function Search() {
    const [movie, setMovie] = React.useState("")
    const [actor, setActor] = React.useState("")
    const [director, setDirector] = React.useState("")
    const [movies, setMovies] = React.useState([])


    
    function search(){
        // const server = ""
        const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3035"; //enable for deployed mode; Change PORT to the port number given to you;

        const url = serverURL + "/api/searchMovies"

        async function searchMovies() {
            const response = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({movie, actor, director})
      
            })

            // console.log(await response.json())
            
            const newMovies = await response.json()
            console.log(newMovies)
            setMovies(newMovies)

            if (response.status !== 200) throw Error(response.message);
        }

        searchMovies()
    }

    function handleMovieChange(event){
        setMovie(event.target.value)
    }

    function handleActorChange(event){
        setActor(event.target.value)
    }

    function handleDirectorChange(event){
        setDirector(event.target.value)
    }
  return (
    <div>
        <AppBar position="static" >
            <h1>Sereana Very Swag B)</h1>
            <Link to="/" style={{"color": "white"}}>
                Home
            </Link>
            <Link to="/search" style={{"color": "white"}}>
                search
            </Link>
            <Link to="/reviews" style={{"color": "white"}}>
                reviews
            </Link>
            <Link to="/moviePosters">
                movie reviews
            </Link>
      </AppBar>
      search
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
    >
        <h1>Search Movie Database</h1>
        <FormLabel id="demo-simple-select-outlined-label">Movie Name</FormLabel>
        <TextField onChange={handleMovieChange}/>
        <FormLabel id="demo-simple-select-outlined-label">Director Name</FormLabel>
        <TextField onChange={handleDirectorChange}/>
        <FormLabel id="demo-simple-select-outlined-label">Actor Name</FormLabel>
        <TextField onChange={handleActorChange}/>
        <Button variant="contained" onClick={search} >Submit</Button>

    {
        movies.map((movie) => {
            return <div>
                <h1>Movie: {movie.name}</h1>
                <h2>Director: {movie.first_name} {movie.last_name}</h2>
                <h3>Reviews: {movie["GROUP_CONCAT (DISTINCT REV.reviewContent)"]}</h3>
            </div>
        })
    }
    </Grid>

    </div>
  )
}
