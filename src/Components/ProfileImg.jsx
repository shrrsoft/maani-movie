import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import { imgBaseURL } from "../apiConfig";
import defaultUserImg from "../assets/default profile.png";
export default function ProfileImg() {
  const { user, session } = useContext(UserContext);
  const navigate = useNavigate();

  return session ? (
    <div className=" ">
      <div className=" mx-a flex flex-col items-center justify-center">
        <img
          className="rounded-full w-12"
          src={
            user.avatar.tmdb.avatar_path
              ? imgBaseURL + "/original" + user.avatar?.tmdb?.avatar_path
              : defaultUserImg
          }
          alt=""
        />
        <h1 className="mt-1 text-center max-w-40 ">{user.name}</h1>
      </div>
    </div>
  ) : (
    <Navigate to="/Login" replace />
  );
}
