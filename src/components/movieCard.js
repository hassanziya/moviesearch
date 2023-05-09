import React, { useState } from 'react';
import './movieCard.css';
import axios from 'axios';
const MovieCard = ({ movieList }) => {
  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});
  const handleMovieDetails = (id) => {
    setLoading(true);
    const baseURL = `http://www.omdbapi.com/?apikey=d3bdd447&i=${id}`;
    axios
      .get(baseURL)
      .then((response) => {
        setLoading(false);
        if (response.data) {
          setMovieDetails(response.data);
        } else {
          setMovieDetails({});
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error?.response?.data?.Error);
      });
  };
  return (
    <>
      <div className="row">
        {movieList.map((movie) => {
          return (
            <div
              className="col col-lg-3 col-md-4 col-sm-6 col-xs-12 my-2 movieCard"
              key={movie.imdbID}
              onClick={() => handleMovieDetails(movie.imdbID)}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <div className="card">
                <img
                  src={movie.Poster}
                  className="card-img-top"
                  alt="Poster"
                  style={{ height: '250px' }}
                />
                <div className="card-body" style={{ color: '#000' }}>
                  <p className="card-text">{movie.Title}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* // <!-- Modal --> */}
      <div
        className="modal fade modal-lg"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog " style={{ color: '#000' }}>
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {loading ? (
                <div>Loading Details...</div>
              ) : (
                <div className="movie-card-container">
                  <div className="image-container">
                    <div
                      className="bg-image"
                      style={{ backgroundImage: `url(${movieDetails.Poster})` }}
                    />
                  </div>
                  <div className="movie-info">
                    <h2>Movie Details</h2>
                    <div>
                      <h1>{movieDetails.Title}</h1>
                      <small>Released Date: {movieDetails.Released}</small>
                    </div>
                    <h4>Rating: {movieDetails.imdbRating} / 10</h4>
                    <p>
                      {movieDetails.Plot && movieDetails.Plot.substr(0, 350)}
                    </p>
                    <div className="tags-container">
                      {movieDetails.Genre &&
                        movieDetails.Genre.split(', ').map((g) => (
                          <span key={g}>{g}</span>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
