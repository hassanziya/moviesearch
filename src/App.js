import { useState } from 'react';
import axios from 'axios';
import './App.css';
// import pageBackground from './Images/movie-background.avif';
import MovieCard from './components/movieCard';
function App() {
  const [searchText, setSearchText] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [errormessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const handleMovieSearch = () => {
    setErrorMessage('');
    setMovieList([]);
    if (searchText.trim() !== '') {
      setLoading(true);
      const baseURL = `http://www.omdbapi.com/?apikey=d3bdd447&s=${searchText}`;
      axios
        .get(baseURL)
        .then((response) => {
          setLoading(false);
          if (response.data.Response === 'True') {
            setMovieList(response.data.Search);
          } else {
            setErrorMessage(response.data.Error);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error?.response?.data?.Error);
          setErrorMessage(error?.response?.data?.Error);
        });
    } else {
      setErrorMessage('please enter a movie name');
    }
  };
  return (
    <div className=" container-fluid App">
      <h1>Find Any Movie</h1>
      <div className="mt-5 mx-5">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter a movie name"
            aria-label="Movie name"
            aria-describedby="button-addon2"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={handleMovieSearch}
          >
            <span style={{ color: '#fff' }}>Search</span>
          </button>
        </div>
      </div>
      <div className="mt-5 mx-5">
        {loading ? (
          <div>Loading Movies...</div>
        ) : errormessage ? (
          <div>{errormessage}</div>
        ) : (
          <MovieCard movieList={movieList} />
        )}
      </div>
    </div>
  );
}

export default App;
