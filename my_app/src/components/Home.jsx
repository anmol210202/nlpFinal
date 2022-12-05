import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [query, setQuery] = useState([]);
  const [data, setData] = useState([]);
  const [moviesInfo, setMoviesInfo] = useState([]);
  const API_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {}, []);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const test = async () => {
    const API_KEY = "388fddf8a9727d1ba2334256826ee373";
    const API_URL = "https://api.themoviedb.org/3";

    const moviesInfo = await Promise.all(
      data.map(async (movie) => {
        const response = await fetch(
          `${API_URL}/search/movie?api_key=${API_KEY}&query=${movie}`
        );
        const data = await response.json();
        return data.results[0];
      })
    );
    //   delete moviesInfo[0];
    delete moviesInfo[0];
    setMoviesInfo(moviesInfo);
    console.log(moviesInfo);
  };

  useEffect(() => {
    test();
  }, [data]);

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
  };

  return (
    <div>
      <div>
       
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
        <div
          style={{
            alignItem: "center",
            display: "grid",
            gridTemplate: "auto auto auto / auto auto auto",
            justifyContent: "center",
          }}>
          {/* make cards from movieinfo with backdrop_path and poster_path */}
          {moviesInfo.map((item, index) => (
            <div
              class='card'
              style={{ width: "23em", padding: "10px", margin: "10px" }}>
              <img
                className='card-img-top'
                src={`${API_IMAGE_URL}${item?.poster_path}`}
                alt='Card image cap'
              />
              <div class='card-body'>
                <h5 class='card-title'>{item?.title}</h5>
                <p class='card-text'>{item?.overview}</p>
                <strong class='card-text '>Release Date: </strong>{" "}
                <span>{item?.release_date}</span>
                <br />
                <strong class='card-text '>Popularity: </strong>{" "}
                <span>{item?.popularity}</span>
              </div>
            </div>
          ))}
        </div>

        <div id='loader' class='text-center'></div>

        <div class='fail'>
          <center></center>
        </div>
      </div>
    </div>
  );
};

export default Home;
