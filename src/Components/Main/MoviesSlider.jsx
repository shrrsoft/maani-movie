import React, { useState } from "react";
import MoviesList from "./MoviesList";

export default function Home() {
  const [movieActiveTab, setMovieActiveTab] = useState("now_playing");

  function handleClick(tab) {
    setMovieActiveTab(tab);
  }

  function activeClass(tab) {
    return tab === movieActiveTab ? "text-rose-400 text-lg" : "";
  }

  return (
    <div className="container mx-auto">
      <div className="mx-auto">
        <div className="mt-12">
          <ul className="flex flex-col md:items-baseline items-center gap-3 md:gap-6 text-white md:flex-row [&>*]:cursor-pointer ">
            <li className="text-slate-300 text-2xl m-2 md:m-6">Movies</li>
            <li
              onClick={() => handleClick("now_playing")}
              className={activeClass("now_playing")}>
              Now Playing
            </li>
            <li
              onClick={() => handleClick("popular")}
              className={activeClass("popular")}>
              Popular
            </li>
            <li
              onClick={() => handleClick("top_rated")}
              className={activeClass("top_rated")}>
              Top rated
            </li>
            <li
              onClick={() => handleClick("upcoming")}
              className={activeClass("upcoming")}>
              Upcoming
            </li>
          </ul>
        </div>
      </div>{" "}
      <MoviesList type="movie" activeTab={movieActiveTab} />
    </div>
  );
}
