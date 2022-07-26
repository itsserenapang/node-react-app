import React, { Component, useEffect } from 'react';
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


//Dev mode
//const serverURL = ""; //enable for dev mode

//Deployment mode instructions
const serverURL = "http://ec2-18-188-101-79.us-east-2.compute.amazonaws.com:3035"; //enable for deployed mode; Change PORT to the port number given to you;
// const serverURL = ""; 
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");

export default function Home() {
  return (
    <>
    <AppBar position="static">
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
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h3" component="h2">
        Review a Movie
      </Typography>
      <Review>
      </Review>
    </Grid>
    </>
  )
}
const Review =({}) => {
  const [movies, setMovies] = React.useState([])
  React.useEffect(() => {
    async function loadMovies() {
      const url = serverURL + "/api/getMovies"
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      })
      if (response.status !== 200) throw Error(body.message);
      const movieList = await response.json()
      setMovies(movieList)
      console.log(movieList)
    }
    loadMovies()
  }, [])
  const [select, setSelect] = React.useState("")
  function updateSelect(event){
    setSelect(event.target.value)
  }
  const [title, setTitle] = React.useState("")
  function updateTitle(event){
    setTitle(event.target.value)
    console.log(title)
  }
  const [body, setBody] = React.useState("")
  function updateBody(event){
    setBody(event.target.value)
    console.log(body)
  }
  const [rating, setRating] = React.useState("")
  function updateRating(event){
    setRating(event.target.value)
    console.log(rating)
  }
  const [userID, setuserID] = React.useState(1)
  const [validSelect, setValidSelect] = React.useState(true)
  const [validTitle, setValidTitle] = React.useState(true)
  const [validBody, setValidBody] = React.useState(true)
  const [validRating, setValidRating] = React.useState(true)
  const [valid, setValid] = React.useState(true)
  const [storedValues, setStoredValues] = React.useState([])
  const [showCon, setShowCon] = React.useState(false)
  function checkValid(){
    if (select !== "") {
      setValidSelect(true)
    } else {
      setValidSelect(false)
      setValid(false)
      return false
    }
    if (title !== "") {
      setValidTitle(true)
    } else {
      setValidTitle(false)
      setValid(false)
      return false
    }
    if (body !== "") {
      setValidBody(true)
    } else {
      setValidBody(false)
      setValid(false)
      return false
    }
    if (rating !== "") {
      setValidRating(true)
    } else {
      setValidRating(false)
      setValid(false)
      return false
    }
    setValid(true)
    return true
  }
  function handleSubmit(){
    if (checkValid()) {
        const review = {
          select,
          title,
          body,
          rating,
          userID
        }

        async function addReview() {
          const url = serverURL + "/api/addReview"
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(review)
    
          })
          if (response.status !== 200) throw Error(body.message);
        }

        addReview()

        setShowCon(true)
        setTimeout(() =>{
          setShowCon(false)
        }, 1000)

        setStoredValues([review, ...storedValues])
        setSelect("")
        setTitle("")
        setBody("")
        setRating("")
    }
  }
  return(
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <MovieSelection
        select = {select}
        handleChange = {updateSelect}
        validSelect = {validSelect}
        movies = {movies}
      >
      </MovieSelection>
      <ReviewTitle
        title = {title}
        handleChange = {updateTitle}
        validTitle = {validTitle}
        >
      </ReviewTitle>
      <ReviewBody
        body = {body}
        handleChange = {updateBody}
        validBody = {validBody}
      >
      </ReviewBody>
      <ReviewRating
        rating = {rating}
        handleChange = {updateRating}
        validRating = {validRating}
      >
      </ReviewRating>
      <Submit
        handleSubmit = {handleSubmit}
        valid = {valid}
      >
      </Submit>
      <br/>
      {
        showCon 
        &&
        <div>Successfully saved review</div>  
      }
      <DisplayReviews 
        reviews = {storedValues}
        />
    </Grid>

  )
}
const MovieSelection = ({select, handleChange, validSelect, movies}) => {
  return (
    <FormControl variant = "outlined">
      <FormLabel id="demo-simple-select-outlined-label">Movie Selection</FormLabel>
      <Select 
        labelId="label" 
        id="select" 
        value={select} 
        onChange={handleChange} 
        error={!validSelect}
      >
        {
          movies.map((movie) => {
            return (
              <MenuItem value={movie.id}>{movie.name}</MenuItem>
            )
          })
        }
      </Select>
    </FormControl>
  )
}
const ReviewTitle = ({title, handleChange, validTitle}) => {
  return (
    <FormControl variant = "outlined">
        <FormLabel id="demo-simple-select-outlined-label">Review Title</FormLabel>
        <TextField 
          id="standard-basic"
          error={!validTitle}
          value={title} 
          onChange={handleChange}
          helperText={!validTitle && "Please enter your review title"}
        />
    </FormControl>
  )
}

const ReviewBody = ({body, handleChange, validBody}) => {
  return (
    <FormControl variant = "outlined">
      <FormLabel id="demo-simple-select-outlined-label">Review</FormLabel>
      <TextField
            id="filled-multiline-flexible"
            multiline
            inputProps={{ maxLength: 200 }}
            rows={10}
            variant="filled"
            value={body}
            onChange={handleChange}
            error={!validBody}
            helperText={!validBody && "Please enter your review"}
        />
    </FormControl>
  )
}
const ReviewRating = ({rating, handleChange, validRating}) => {
  return (
    <FormControl variant = "outlined" >
      <FormLabel id="demo-simple-select-outlined-label" >Rating</FormLabel>
      <RadioGroup 
        aria-label="gender" 
        name="gender1" 
        value={rating} 
        onChange={handleChange} 
        error={!validRating}
        >
        <FormControlLabel value="1" control={<Radio />} label="1" />
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="3" control={<Radio />} label="3" />
        <FormControlLabel value="4" control={<Radio />} label="4" />
        <FormControlLabel value="5" control={<Radio />} label="5" />
        <FormHelperText >{!validRating && "Please enter your review rating"}</FormHelperText>
      </RadioGroup>
    </FormControl>
  )
}
const Submit = ({handleSubmit, valid}) => {
  return (
    <Button variant="contained" onClick={handleSubmit} >Submit</Button>
  )
}
const DisplayReviews = ({reviews}) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
    {reviews.map(review=>{
      return(<DisplayReview review = {review}/>)
    })}
    </Grid>
  )
}
const DisplayReview = ({review}) => {
  return (
    <div>
    <div> Movie Title: {review.select}</div>
    <div> Review Title: {review.title}</div>
    <div>Review: {review.body}</div>
    <div>Rating: {review.rating}</div>
    </div>
  )
}

