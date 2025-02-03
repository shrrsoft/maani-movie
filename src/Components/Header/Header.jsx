import React, { useState } from "react";
import Navigation from "./Navigation";
import SearchBox from "./SearchBox";
import FollowUs from "./FollowUs";
import HeaderSlider from "./HeaderSlider.jsx";
import { useLocation } from "react-router-dom";

export default function Header() {
  const [bg, setBg] = useState("src/assets/background image/background.jpg");

  const location = useLocation();
  return (
    <header
      className="bg-center bg-cover pb-6 h-[45rem] "
      style={{
        backgroundImage: `linear-gradient(to bottom, rgb(0 0 0 / 70%), rgb(0 0 0 / 90%)),  url('${bg}') `,
      }}>
      <div className="container mx-auto">
        <Navigation />
        <SearchBox />
        {location.pathname === "/" && (
          <>
            <FollowUs />
            <HeaderSlider setBg={setBg} />
          </>
        )}
      </div>
    </header>
  );
}
