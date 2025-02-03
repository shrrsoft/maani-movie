import React, { useEffect, useState } from "react";
import MoviesCard from "../Movies/MoviesCard";
import axios from "axios";

export default function MoviesList({ type, activeTab }) {
  const [movies, setMovies] = useState([]);

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/${type}/${activeTab}`,
    params: { language: "en-US", page: "1" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTI5ZmU1YjU3YjA4NDRjMDI0NWRlZmZkMjVmMGQ3ZiIsInN1YiI6IjY2NWQ1ZWEyYTVlMDU0MzUwMTQ5MTlkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9ByxUHfhnVr9uiwOwUP4SAwA6Go6sn8Ry9YJcyui1M8",
    },
  };

  async function loadMovies() {
    await axios
      .request(options)
      .then(function (response) {
        setMovies(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  useEffect(() => {
    loadMovies();
  }, [type, activeTab]);

  const breakpoints = JSON.stringify({
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    768: {
      slidesPerView: 3,
      spaceBetween: 10,
    },

    1024: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
  });

  return (
    <>
      <div>
        <swiper-container autoplay="true" loop="true" breakpoints={breakpoints}>
          {movies.map((movie) => (
            <swiper-slide key={movie.id} className="w-1">
              <MoviesCard type={type} movie={movie} />
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
    </>
  );
}
