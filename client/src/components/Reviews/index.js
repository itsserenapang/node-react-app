import * as React from 'react';
import {Link} from 'react-router-dom'
import AppBar from "@material-ui/core/AppBar";


export default function index() {
  return (
    <div>
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
      </AppBar>
      reviews
    </div>
  )
}
