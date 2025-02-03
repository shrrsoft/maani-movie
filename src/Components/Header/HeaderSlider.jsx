import axios from "axios";
import { useEffect, useState } from "react";
import { register } from "swiper/element/bundle";
import { apiKey, baseURL, imgBaseURL } from "../../apiConfig";
import { Link } from "react-router-dom";
register();

export default function HeaderSlider({ setBg }) {
  const [movies, setMovies] = useState([]);
  const defBg = "src/assets/background image/background.jpg";

  async function loadMovies() {
    const { data } = await axios.get(`${baseURL}/popular?api_key=${apiKey}`);
    setMovies(data.results);
  }

  useEffect(() => {
    loadMovies();
  }, []);

  function posterImage(path, size = "w300") {
    return `${imgBaseURL}/${size}${path}`;
  }

  const breakpoints = JSON.stringify({
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    768: {
      slidesPerView: 3,
      spaceBetween: 40,
    },

    1024: {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  });

  return (
    <div className="mt-8 text-center">
      <swiper-container
        class="mySwiper"
        Navigation="true"
        loop="true"
        autoplay="true"
        breakpoints={breakpoints}>
        {movies.map((movie) => (
          <swiper-slide key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img
                className="mx-auto"
                onMouseOver={(e) => setBg(posterImage(movie.poster_path))}
                onMouseLeave={(e) => setBg(defBg)}
                src={posterImage(movie.poster_path)}
                alt={movie.title}
              />
            </Link>
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  );
}
