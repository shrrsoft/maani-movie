import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { imgBaseURL } from "../../apiConfig";

export default function MoviesCard({ movie, type }) {
  const [opacityImg, SetOpacityImg] = useState("" & false);

  function posterImage(path, size = "w300") {
    return `${imgBaseURL}/${size}${path}`;
  }

  return (
    <Link to={`/${type}/${movie.id}`}>
      <div className=" w-fit mx-auto bg-cover relative m-5 text-slate-300 bg-gradient-to-b from-slate-900  to-slate-800 rounded-md p-0.5 ">
        <div
          onMouseMove={(e) => SetOpacityImg("opacity-20")}
          onMouseLeave={(e) => SetOpacityImg("")}>
          <img
            className={`h-80  transition-all  delay-50 duration-500 rounded-sm ${opacityImg}`}
            src={posterImage(movie.poster_path)}
            alt=""
          />
        </div>
        <div className="mt-2 ml-1 ">
          <span className="mr-2">
            <FontAwesomeIcon icon={faStar} className="text-yellow-600 " />{" "}
          </span>
          <span>{movie.vote_average.toFixed(1)}/10</span>
        </div>
        <div>
          <h3 className="ml-1 h-12 max-w-52">
            {movie.title} {movie.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}
