import React, { useEffect, useState } from "react";
import { useTodo } from "../Context/TodoContext.jsx";
import { logoutUser } from "../api/users";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const { user, authStatus, setAuthStatus } = useTodo();

  useEffect(() => {
    setAuthStatus(authStatus);
  }, [authStatus]);

  const handleSubmit = async () => {
    await logoutUser();
    setAuthStatus(false);
    navigate("/login");
  };

  return (
    <header className="fixed top-0 z-10 mx-auto flex w-full max-w-full items-center justify-between border-b-[1px] border-b-slate-300 bg-[#121212] p-4 text-white lg:px-10">
      <Link to="/" className="text-xl font-extrabold md:text-3xl">TaskFlow</Link>
      <div>
        {authStatus ? (
          <>
            <h1 className="text-xl font-extrabold md:text-3xl">
              {user?.fullname}
            </h1>
            <button
              onClick={handleSubmit}
              className="mt-5 bg-[#ae7aff] p-3 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="mt-5 bg-[#ae7aff] mr-3 p-3 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/sign-up")}
              className="mt-5 bg-[#ae7aff] p-3 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
