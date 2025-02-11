import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieItem from "../Items-searchBox/MovieItem";
import TvItem from "../Items-searchBox/TvItem";
import PersonItem from "../Items-searchBox/PersonItem";

// async function searchMovie(query) {
// setTimeout(async () => {
// const searchMovieResault = await axios.get(
// `${urlAuth}/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
// {
// Authorization:
// "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDY1YjA2ZGNmNjgyNTI0YzUxOThhNjY2NDI2NjY0YyIsInN1YiI6IjYzNWI3MWZhMGMzZWM4MDA3ZTRjY2NiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Mtqg3AhPC3V3IG_IriCDbHjbSSTveLb-oQKfFrUCX8U",
// }
// );
// console.log(searchMovieResault);
// }, 500);
// }

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/search/multi",
    params: {
      query: query,
      include_adult: "false",
      language: "en-US",
      page: "1",
    },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTI5ZmU1YjU3YjA4NDRjMDI0NWRlZmZkMjVmMGQ3ZiIsInN1YiI6IjY2NWQ1ZWEyYTVlMDU0MzUwMTQ5MTlkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9ByxUHfhnVr9uiwOwUP4SAwA6Go6sn8Ry9YJcyui1M8",
    },
  };

  useEffect(() => {
    const timeOut = setTimeout(async () => {
      if (query) {
        await axios
          .request(options)
          .then(function (response) {
            setSearchResult(response.data.results);
          })

          .catch(function (error) {
            console.error(error);
          });
      }
    }, 350);
    return () => {
      clearTimeout(timeOut);
    };
  }, [query]);

  function showItem(item) {
    switch (item.media_type) {
      case "movie":
        return <MovieItem key={item.id} item={item} />;
      case "tv":
        return <TvItem key={item.id} item={item} />;
      case "person":
        return <PersonItem key={item.id} item={item} />;
    }
  }

  return (
    <section className=" mt-7">
      <div className="relative">
        <input
          type="text"
          placeholder="search movies, TV Shows, Persons and ...."
          className="w-full bg-slate-900/70 rounded-md p-2 border-slate-500 border-2 outline-none placeholder:text-slate-500 placeholder:text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="text-slate-400 absolute top-1/3 right-4 scale-150 hover:text-white"
        />
        <div
          onClick={() => setSearchResult([])}
          className={`bg-slate-900/70 rounded-md absolute w-full z-10  text-slate-300 text-lg transition-all duration-200 ${
            searchResult.length && query
              ? "max-h-72 overflow-auto"
              : "h-0 overflow-hidden"
          }`}>
          <div>{searchResult.map((resault) => showItem(resault))}</div>
        </div>
      </div>
    </section>
  );
}
