import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import ProfileImg from "../ProfileImg";

const menuItems = [
  { path: "/", text: "HOME" },
  { path: "/Movies", text: "MOVIES" },
  { path: "/Tvs", text: "Tv" },
  { path: "/People", text: "PEOPLE" },
  { path: "/More", text: "MORE" },
];

export default function Navigation() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const { user, logout, userProfileImg } = useContext(UserContext);

  function activeClass({ isActive }) {
    return isActive ? "text-rose-400" : "hover:text-white";
  }

  return (
    <>
      <nav className="flex items-center justify-between pt-6 pb-0 md:pt-8">
        <div className="flex items-baseline gap-14">
          <Link to="/">
            <h1 className="mr-12 md:mr-4 text-3xl">
              Maani<span className="text-rose-500">Movies</span>
            </h1>
            <p className="ml-8 text-sm text-slate-400">Reviwe Movies</p>
          </Link>
          <ul className="hidden md:flex md:gap-4 gap-6 uppercase flex-wrap ">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink className={activeClass} to={item.path}>
                  {item.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="ml-auto hidden md:flex gap-2 ">
          {Object.keys(user).length ? (
            <div className="flex items-center gap-4">
              {/* <div className="">{user.name}</div> */}
              <ProfileImg />
              <ul>
                <li>
                  <NavLink
                    className="border-2 px-3 py-1.5 rounded-lg  hover:bg-slate-400/60 hover:text-white  "
                    to="/login"
                    onClick={logout}>
                    Logout
                  </NavLink>
                </li>
              </ul>
            </div>
          ) : (
            <ul className="hidden md:flex md:flex-col-reverse md:items-center lg:flex-row gap-8 uppercase ">
              <li>
                <NavLink className="hover:text-white " to="/login">
                  login
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="text-white border-2 border-slate-400/60 bg-rose-600/60 hover:bg-rose-500 hover:border-slate-400 px-4 py-1.5 rounded-xl"
                  to="/signup">
                  sign up
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        <div className="md:hidden text-2xl">
          <button onClick={() => setIsOpenMenu(!isOpenMenu)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </nav>
      <div
        className={`md:hidden mx-auto bg-slate-900/70 rounded-2xl  ${
          isOpenMenu ? " h-full pt-4 pb-8 " : "h-0 p-0 overflow-auto"
        }`}>
        <div className="pt-4 border-t-2 border-slate-500 mx-auto ">
          <ul className="flex flex-col justify-center items-center pb-4 gap-4">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  className={activeClass}
                  onClick={() => setIsOpenMenu(false)}
                  to={item.path}>
                  {item.text}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="pt-6 border-t-2 border-slate-500">
            {Object.keys(user).length ? (
              <div className="flex items-center justify-center gap-4 ">
                <ProfileImg />
                <NavLink
                  className="border-2 px-3 py-1 rounded-lg w-20  hover:bg-slate-400/60 hover:text-white  "
                  to="/login"
                  onClick={logout}>
                  Logout
                </NavLink>
              </div>
            ) : (
              <ul className="flex items-center justify-center gap-4">
                <li>
                  <NavLink
                    className="hover:text-white"
                    onClick={() => setIsOpenMenu(false)}
                    to="/login">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={() => setIsOpenMenu(false)}
                    className="text-white border-2 border-slate-400/60 bg-rose-600/60 hover:bg-rose-500 hover:border-slate-400 px-4 py-1.5 rounded-xl"
                    to="/signup">
                    sign up
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
