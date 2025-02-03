import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiKey, baseURL, imgBaseURL } from "../../apiConfig";
import { UserContext } from "../../Context/UserContext";

export default function Tv() {
  const [tv, setTv] = useState([]);
  const { id } = useParams();
  const { user, session } = useContext(UserContext);

  async function handleAddToWatchList() {
    const result = await axios.post(
      `${baseURL}/account/${user.id}/favorite?api_key=${apiKey}&session_id=${session}`,
      {
        media_type: "tv",
        movie_id: tv.id,
        favorite: true,
      }
    );
  }

  async function loadingMovie() {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`
    );
    setTv(data);
  }

  useEffect(() => {
    loadingMovie();
  }, [id]);

  function posterImage(path, size = "w300") {
    return `${imgBaseURL}/${size}${path}`;
  }

  return (
    <div className="container my-6 flex items-center relative top-[-32rem] mx-auto">
      <img src={posterImage(tv.poster_path)} alt={tv.name} />
      <div className="m-5 flex flex-col gap-3 items-center">
        <h1 className="text-lg">{tv.name}</h1>
        <button
          className="bg-yellow-500 text-black p-2 rounded-lg text-center"
          onClick={handleAddToWatchList}>
          Add to Watch List
        </button>
      </div>
    </div>
  );
}
