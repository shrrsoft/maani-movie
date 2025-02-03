import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiKey, baseURL, imgBaseURL } from "../../apiConfig";
import { UserContext } from "../../Context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Rating } from "react-simple-star-rating";
import {
  faHeartCircleMinus,
  faHeartCirclePlus,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";

export default function Movie() {
  const [movie, setMovie] = useState([]);
  const { id } = useParams();
  const { user, session, favoriteMovies } = useContext(UserContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(0);
  const handleRating = (rate) => {
    setRating(rate);
  };

  let movieRate = Math.round(movie.vote_average * 10) / 10;

  useEffect(() => {
    if (movie && favoriteMovies.length) {
      const boolIsFavorite = favoriteMovies.find((f) => f.id === movie.id);
      setIsFavorite(Boolean(boolIsFavorite));
    }
  }, [movie, favoriteMovies]);

  async function handleAddToWatchList() {
    const result = await axios.post(
      `${baseURL}/account/${user.id}/favorite?api_key=${apiKey}&session_id=${session}`,
      {
        media_type: "movie",
        movie_id: movie.id,
        favorite: true,
      }
    );
  }

  async function loadingMovie() {
    const { data } = await axios.get(`${baseURL}/${id}?api_key=${apiKey}`);
    setMovie(data);
  }

  useEffect(() => {
    loadingMovie();
  }, [id]);

  function posterImage(path, size = "w300") {
    return `${imgBaseURL}/${size}${path}`;
  }

  async function changeFavorite(id) {
    const options = {
      method: "POST",
      url: "https://api.themoviedb.org/3/account/21305597/favorite",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTI5ZmU1YjU3YjA4NDRjMDI0NWRlZmZkMjVmMGQ3ZiIsInN1YiI6IjY2NWQ1ZWEyYTVlMDU0MzUwMTQ5MTlkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9ByxUHfhnVr9uiwOwUP4SAwA6Go6sn8Ry9YJcyui1M8",
      },
      data: { media_type: "movie", media_id: id, favorite: true },
    };
    await axios
      .request(options)
      .then(function (response) {})
      .catch(function (error) {
        console.error(error);
      });
  }

  const optionsRate = {
    method: "POST",
    url: `https://api.themoviedb.org/3/movie/${movie.id}/rating`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTI5ZmU1YjU3YjA4NDRjMDI0NWRlZmZkMjVmMGQ3ZiIsIm5iZiI6MTcyMDExODQwOS4yMTgzNDQsInN1YiI6IjY2NWQ1ZWEyYTVlMDU0MzUwMTQ5MTlkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dzPWQApn4Ke5iKmBcx85FZ-D3Z01yRAotOpCTCnkp3Q",
    },
    data: `{"value":${rating}}`,
  };

  useEffect(() => {
    axios
      .request(optionsRate)
      .then(function (response) {})
      .catch(function (error) {
        console.error(error);
      });
  }, [rating]);

  return (
    <div className="container my-6 flex items-start md:justify-start justify-center relative top-[-32rem] mx-auto flex-wrap">
      <img src={posterImage(movie.poster_path)} alt={movie.title} />
      <div className="mx-5 flex flex-col gap-3 items-start ">
        <h1 className="text-3xl">{movie.title}</h1>
        <div className="flex items-center gap-4  ">
          <div className="flex items-center gap-1">
            <span className=" border-rose-600 rounded-full ">
              {isFavorite ? (
                <FontAwesomeIcon
                  icon={faHeartCircleMinus}
                  className="text-rose-600 text-2xl"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faHeartCirclePlus}
                  className="text-rose-600 text-2xl "
                />
              )}
            </span>
            <button onClick={() => changeFavorite(movie.id)}>
              {isFavorite ? "Remove from" : "Add to"} favorite
            </button>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-lg  border-rose-600 rounded-full px-1.5  ">
              <FontAwesomeIcon
                icon={faShareNodes}
                className="text-rose-600 text-2xl "
              />
            </span>
            <button>share</button>
          </div>
        </div>
        <div className="flex gap-8 items-center border p-2 border-slate-500/60 rounded-md">
          <span>
            Movie Rate : <span className="  text-rose-500">{movieRate}</span> (
            {movie.vote_count} votes)
          </span>
          <div className="flex items-center gap-2 border-l  border-slate-500/60 pl-6">
            <span>Your rate:</span>
            <div className="App ">
              <Rating
                onClick={handleRating}
                SVGclassName="inline"
                allowFraction="true"
                size="30"
              />
            </div>
          </div>
        </div>
        <button
          className="bg-yellow-500 text-black p-2 rounded-lg text-center"
          onClick={handleAddToWatchList}>
          Add to Watch List
        </button>
        <div className="max-w-[30rem]">
          Overview : <br /> {movie.overview}
        </div>
      </div>
    </div>
  );
}
