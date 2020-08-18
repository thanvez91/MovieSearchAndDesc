import React, { useState, useEffect } from "react";
import "./movietile.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Route from "react-router-dom/Route";
import { DescriptionComponent } from "./Description.jsx";

export const MoviesTiles = () => {
  const [movies, getMovies] = useState();
  const [loading, setloding] = useState(false);
  const [error, setError] = useState("");
  const [moviecode, setMovieCode] = useState("");

  const clickMovieAjax = () => {
    fetch(`https://www.omdbapi.com/?apikey=b9bd48a6&s=${moviecode}&type=movie`)
      .then(res => res.json())
      .then(data => {
        getMovies(data);
        setloding(false);
        setError("");
      })
      .catch(err => {
        setloding(false);
        setError("Something wet wrong");
      });
  };

  return (
    <div>
      <div>
        <div>
          <SearchPanelWithCards
            data={movies}
            clickMovieAjax={clickMovieAjax}
            setMovieCode={setMovieCode}
          />
          {movies && movies.Error}
        </div>
      </div>
    </div>
  );
};

export default MoviesTiles;

export const SearchPanelWithCards = props => {
  const [keyWord, setKeyWord] = useState("");
  const [imdbnumber, getImdbNumber] = useState("");

  return (
    <div>
      <Router>
        <Route
          path="/"
          exact
          strict
          render={() => {
            return (
              <div>
                <h1>Search For Movie</h1>
                <input
                  id={"search-input"}
                  type="text"
                  onChange={event => props.setMovieCode(event.target.value)}
                />
                <button onClick={() => props.clickMovieAjax()}>Search</button>
              </div>
            );
          }}
        ></Route>

        <Route
          path="/"
          exact
          strict
          render={() => {
            return (
              <div className="wrapper-movie-tile">
                {props &&
                  props.data &&
                  props.data.Search &&
                  props.data.Search.filter(movie =>
                    movie.Title.includes(keyWord.length >= 2 ? keyWord : "")
                  ).map(movie => {
                    return (
                      <div
                        className="wrapper-movie-tile-inner"
                        onClick={() => getImdbNumber(movie.imdbID)}
                      >
                        <Link to="/about">
                          <div>
                            <img src={movie.Poster} alt="Girl in a jacket" />
                          </div>
                        </Link>
                      </div>
                    );
                  })}
              </div>
            );
          }}
        ></Route>
        <Route
          path="/about"
          exact
          strict
          render={props => (
            <DescriptionComponent {...props} imdbnumber={imdbnumber} />
          )}
        ></Route>
      </Router>
    </div>
  );
};
