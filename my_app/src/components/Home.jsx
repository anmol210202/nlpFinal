import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [query, setQuery] = useState([]);
  const [data, setData] = useState([]);
  const [moviesInfo, setMoviesInfo] = useState([]);
  // useEffect(() => {
  //     fetch("http://127.0.0.1:8000/score/", {
  //       method: "post",
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },

  //       //make sure to serialize your JSON body
  //       body: JSON.stringify({
  //         data: query
  //       })
  //     }).then( (response) => response.json()).then((data) => {
  //       data = JSON.parse(data.data);
  //       console.log(data);
  //     });

  //   }, [])
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(query);
    fetch("http://127.0.0.1:8000/score/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        data: query,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        data = JSON.parse(data.data);
        setData(data);
      });
    // 'Avengers, The'
    const API_KEY = "388fddf8a9727d1ba2334256826ee373";
    const API_URL = "https://api.themoviedb.org/3";
    const API_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
    

  
    const getMoviesInfo = async (movies) => {
        const moviesInfo = await Promise.all(
            movies.map(async (movie) => {
            const response = await fetch(
                `${API_URL}/search/movie?api_key=${API_KEY}&query=${movie}`
            );
            const data = await response.json();
            return data;
            })
        );
        setMoviesInfo(moviesInfo);
        console.log(moviesInfo);
        };
        getMoviesInfo(data);
    };




//     // get movie data from api
//     const getMovieData = async (movieName) => {
//       const response = await axios.get(
//         `${API_URL}/search/movie?api_key=${API_KEY}&query=${movieName}`
//       );
//       return response.data.results;
//     };

//     // get movie image from api

//     const getMovieImage = (moviePoster) => {
//       return `${API_IMAGE_URL}${moviePoster}`;
//     };

//     const getMoviePoster = async (movieName) => {
//       const movieData = await getMovieData(movieName);
//       const moviePoster = movieData[0].poster_path;
//       const moviePosterUrl = getMovieImage(moviePoster);
//       return moviePosterUrl;
//     };
//     const getMovieUrl = async (movieName) => {
//       const movieData = await getMovieData(movieName);
//       const movieUrl = movieData[0].backdrop_path;
//       const movieUrlUrl = getMovieImage(movieUrl);
//       return movieUrlUrl;
//     };
//     let x = getMovieUrl("Titanic");
//     let y;
//     x.then((value) => {
//       y = value;
//     });
//   };

  return (
    <div>
      <div>
        <a
          href='https://github.com/kishan0725/AJAX-Movie-Recommendation-System-with-Sentiment-Analysis'
          target='_blank'
          class='github-corner'
          title='View source on GitHub'>
          <svg
            data-toggle='tooltip'
            data-placement='left'
            width='80'
            height='80'
            viewBox='0 0 250 250'
            style={{
              fill: "#151513",
              color: "#fff",
              position: "absolute",
              top: 0,
              border: 0,
              right: 0,
            }}
            aria-hidden='true'>
            <path d='M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z'></path>
            <path
              d='M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2'
              fill='currentColor'
              style={{ transformOrigin: "130px 106px" }}
              class='octo-arm'></path>
            <path
              d='M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z'
              fill='currentColor'
              class='octo-body'></path>
          </svg>
        </a>
        <center>
          <h1> Movie Recommendation System</h1>
        </center>
        <div
          class='form-group shadow-textarea'
          style={{ width: "50%", margin: "auto", marginTop: "5%" }}>
          <input
            type='text'
            name='movie'
            class='movie form-control'
            id='autoComplete'
            autocomplete='off'
            placeholder='Enter the Movie Name'
            style={{ width: "100%", height: "50px", fontSize: "20px" }}
            value={query}
            onChange={handleChange}
          />
          <br />
        </div>
        <div class='form-group' style={{ width: "50%", margin: "auto" }}>
          <button
            class='btn btn-primary btn-block movie-button'
            style={{ width: "50%", margin: "auto", marginTop: "5%" }}
            // onClick={}>
            onClick={handleSubmit}>
            Enter
          </button>
        </div>
        {/* take data and print names of movies */}
        <div
          class='form-group'
          style={{ width: "50%", margin: "auto", marginTop: "5%" }}>
          <h3>Recommended Movies</h3>
          <ul>
            {data.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
            </ul>
        </div>
        
        <div id='loader' class='text-center'></div>

        <div class='fail'>
          <center>
            <h3>
              Sorry! The movie you requested is not in our database. Please
              check the spelling or try with other movies!
            </h3>
          </center>
        </div>
      </div>
    </div>
  );
};

export default Home;
