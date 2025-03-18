import React from "react";
import { Header, Body } from "../Components/index.js";
import { useTodo } from "../Context/TodoContext.jsx";
import { Navigate, useNavigate } from "react-router-dom";

function Home() {
  const { authStatus } = useTodo();
  const navigate = useNavigate();

  return (
    <>
      <div class="min-h-screen bg-[#121212]">
        <Header />
        <div class="flex h-full min-h-screen w-full flex-col items-center justify-center px-4 text-center">
          <div class="flex flex-col items-center justify-center gap-4 text-white">
            <h1 class="text-4xl font-extrabold md:text-6xl">
              Less Stress, More Success!
              <br />
              Check It Off & Move On!
              <br />
              Your Personal Productivity Powerhouse!
            </h1>
          </div>
          {authStatus ? (
            <button
              onClick={(e) => navigate("/todos")}
              class="mt-14 inline-flex w-max items-center bg-[#ae7aff] p-3 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
            >
              Go to Dashboard
            </button>
          ) : (
            <div className="text-white mt-7">Create your Account or Login</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
