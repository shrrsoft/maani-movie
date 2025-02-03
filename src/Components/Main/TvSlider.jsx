import React, { useState } from "react";
import MoviesList from "../Main/MoviesList";

export default function Home() {
  const [movieActiveTab, setMovieActiveTab] = useState("airing_today");

  function handleClick(tab) {
    setMovieActiveTab(tab);
  }

  function activeClass(tab) {
    return tab === movieActiveTab ? "text-rose-400 text-lg" : "";
  }

  return (
    <div className="container mx-auto">
      <div className="mt-12">
        <ul className="flex flex-col md:items-baseline items-center gap-3 md:gap-6 text-white md:flex-row [&>*]:cursor-pointer ">
          <li className="text-slate-300 text-2xl m-2 md:m-6">TV Series</li>
          <li
            onClick={() => handleClick("airing_today")}
            className={activeClass("airing_today")}>
            Airing Today
          </li>
          <li
            onClick={() => handleClick("on_the_air")}
            className={activeClass("on_the_air")}>
            On The Air
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
        </ul>
      </div>{" "}
      <MoviesList type="tv" activeTab={movieActiveTab} />
    </div>
  );
}
