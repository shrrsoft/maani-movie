import axios from "axios";
import { apiKey, imgBaseURL, urlAuth } from "../apiConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const navigate = useNavigate();
  const [user, SetUser] = useState({});
  const [session, setSession] = useState(() => localStorage.getItem("session"));
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favoriteTv, setFavoriteTv] = useState([]);

  async function getUserData() {
    const { data } = await axios.get(
      `${urlAuth}/account?api_key=${apiKey}&session_id=${session}`
    );
    SetUser(data);

    const optionsFavoriteMovies = {
      method: "GET",
      url: "https://api.themoviedb.org/3/account/21305597/favorite/movies",
      params: { language: "en-US", page: "1", sort_by: "created_at.asc" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTI5ZmU1YjU3YjA4NDRjMDI0NWRlZmZkMjVmMGQ3ZiIsInN1YiI6IjY2NWQ1ZWEyYTVlMDU0MzUwMTQ5MTlkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9ByxUHfhnVr9uiwOwUP4SAwA6Go6sn8Ry9YJcyui1M8",
      },
    };

    axios
      .request(optionsFavoriteMovies)
      .then(function (response) {
        setFavoriteMovies(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  useEffect(() => {
    if (session) {
      getUserData();
    }
  }, [session]);

  const UserProfileImg = `${imgBaseURL}/original${user?.avatar?.tmdb?.avatar_path}`;

  function logout() {
    SetUser({}), setSession(null), localStorage.clear();
  }

  async function login(username, password) {
    try {
      const tokenResult = await axios.get(
        `${urlAuth}/authentication/token/new?api_key=${apiKey}`
      );

      const authoriz = await axios.post(
        `${urlAuth}/authentication/token/validate_with_login?api_key=${apiKey}`,
        { username, password, request_token: tokenResult.data.request_token }
      );
      const session = await axios.post(
        `${urlAuth}/authentication/session/new?api_key=${apiKey}`,
        { request_token: tokenResult.data.request_token }
      );
      setSession(session.data.session_id);
      localStorage.setItem("session", session.data.session_id);

      navigate("/profile", { replace: true });
    } catch {
      toast.error("invalid User");
    }
  }

  return (
    <UserContext.Provider
      value={{ user, login, session, logout, UserProfileImg, favoriteMovies }}>
      {children}
    </UserContext.Provider>
  );
}
