import React, { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import { imgBaseURL } from "../../apiConfig";

export default function Profile() {
  const { user, session } = useContext(UserContext);
  const navigate = useNavigate();

  return session ? (
    <div className="container my-8 ">
      <h2>profile page</h2>
      <div className="m-3 mx-a flex flex-col items-start justify-center">
        <img
          className="rounded-full w-28"
          src={imgBaseURL + "/original" + user.avatar?.tmdb?.avatar_path}
          alt=""
        />
        <h1 className="mt-1">{user.name}</h1>
      </div>
    </div>
  ) : (
    <Navigate to="/Login" replace />
  );
}
