import React from "react";
import { imgBaseURL } from "../../apiConfig";
import { Link } from "react-router-dom";

export default function Tv({ item }) {
  return (
    <Link to={`/Tv/${item.id}`}>
      <div className="border border-slate-500 rounded-md bg-slate-600/40 p-2 mx-auto my-4 flex gap-5 items-center justify-between w-[20rem]  h-[8rem] md:w-[95%] md:h-[8rem]">
        <div className="flex flex-col ">
          <span className="text-2xl">{item.name}</span>
          <span className="text-sm">TV show</span>
        </div>

        <img
          className="w-[4rem]"
          src={
            item.poster_path
              ? `${imgBaseURL}/w300/${item.poster_path}`
              : "src/assets/default tv.png"
          }
          alt={item.name}
        />
      </div>
    </Link>
  );
}
