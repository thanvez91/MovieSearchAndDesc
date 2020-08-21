import React, { useState, useEffect } from "react";
import "./movietile.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Route from "react-router-dom/Route";


export const DescriptionComponent = props => {
    const [desc, getdesc] = useState();
    useEffect(() => {
      fetch(`https://www.omdbapi.com/?apikey=b9bd48a6&i=${props.imdbnumber}`)
        .then(res => res.json())
        .then(data => getdesc(data));
    }, []);
  
    return (
      <div>
        {desc ? (
          <div className="descWrapper">
               <Link to="/">Back</Link>
               <h2>Description</h2>
            <ul>
              <li><b>Title:</b>{desc.Title}</li>
              <li><b>Year:</b>{desc.Year}</li>
              <li><b>Rated:</b>{desc.Rated}</li>
              <li><b>Released:</b>{desc.Released}</li>
              <li><b>Runtime:</b>{desc.Runtime}</li>
              <li><b>Genre:</b>{desc.Genre}</li>
              <li><b>Director:</b>{desc.Director}</li>
              <li><b>Writer:</b>{desc.Writer}</li>
              <li><b>Actors:</b>{desc.Actors}</li>
            </ul>
            <p><b>Plot:</b>{desc.Plot}</p>
            <p><b>Language:</b>{desc.Language}</p>
            <p><b>Country:</b>{desc.Country}</p>
            <p><b>Metascore:</b>{desc.Metascore}</p>
            <p><b>imdbRating:</b>{desc.imdbRating}</p>
          </div>
        ) : (
          ".....Loading"
        )}
      </div>
    );
  };