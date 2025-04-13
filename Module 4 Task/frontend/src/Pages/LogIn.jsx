import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useTodo } from "../Context/TodoContext.jsx";
import { loginUser } from "../api/users.js";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const { saveUser } = useTodo();
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  };

  const myForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      try {
        await loginUser(values);
        saveUser(values);
        navigate("/todos");
        resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <div className="min-h-screen bg-[#121212]">
        <header className="fixed top-0 z-10 mx-auto w-full max-w-full bg-[#121212] p-6 text-white lg:px-10">
          <Link to="/" className="text-xl font-extrabold md:text-3xl">
            TaskFlow
          </Link>
        </header>
        <div className="mx-auto flex w-full items-stretch justify-between gap-10">
          <div className="mt-20 flex w-full flex-col items-start justify-start p-6 md:w-1/2 lg:px-10">
            <div className="w-full">
              <h1 className="mb-2 text-5xl font-extrabold text-white">
                Log in
              </h1>
              <p className="text-xs text-slate-400">
                Before we start, please log into your account
              </p>
            </div>
            <form
              onSubmit={myForm.handleSubmit}
              className="my-14 flex w-full flex-col items-start justify-start gap-4"
            >
              <div className="flex w-full flex-col items-start justify-start gap-2">
                <label id="email" className="text-xs text-slate-200">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email..."
                  value={myForm.values.email}
                  onChange={myForm.handleChange}
                  onBlur={myForm.handleBlur}
                  className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500"
                />
                {myForm.touched.email && myForm.errors.email && (
                  <p className="text-red-500 text-xs">{myForm.errors.email}</p>
                )}
              </div>
              <div className="flex w-full flex-col items-start justify-start gap-2">
                <label id="password" className="text-xs text-slate-200">
                  Password
                </label>
                <input
                  name="password"
                  placeholder="Enter your password..."
                  value={myForm.values.password}
                  onChange={myForm.handleChange}
                  onBlur={myForm.handleBlur}
                  type="password"
                  className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500"
                />
                {myForm.touched.password && myForm.errors.password && (
                  <p className="text-red-500 text-xs">
                    {myForm.errors.password}
                  </p>
                )}
              </div>
              <div className="mt-3 inline-flex w-full items-center justify-between">
                <div className="mr-4 flex items-center">
                  <input
                    type="checkbox"
                    id="checkbox-1"
                    className="absolute h-6 w-6 cursor-pointer opacity-0 [&:checked+div]:bg-green-500 [&:checked+div_svg]:block"
                    name="checkbox-1"
                  />
                  <div className="mr-2 flex h-6 w-6 flex-shrink-0 items-center justify-center border-[1px] border-white bg-transparent focus-within:border-white">
                    <svg
                      className="pointer-events-none hidden h-3 w-3 fill-current text-white"
                      version="1.1"
                      viewBox="0 0 17 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="none" fillRule="evenodd">
                        <g
                          transform="translate(-9 -11)"
                          fill="#000000"
                          fillRule="nonzero"
                        >
                          <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z"></path>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <label
                      for="checkbox-1"
                      className="text-sm font-medium text-white"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <p className="cursor-pointer text-sm text-white hover:underline">
                  Forgot password?
                </p>
              </div>
              <button
                type="submit"
                className="mt-5 w-full bg-[#ae7aff] p-3 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
              >
                Log in
              </button>
            </form>
            <p className="my-7 text-sm font-light text-white">
              Don&#x27;t have an account?{" "}
              <Link
                to="/sign-up"
                className="cursor-pointer font-bold hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
          <div className="fixed right-0 z-20 hidden h-screen w-1/2 md:block">
            <img
              className="h-full w-full object-cover"
              src="https://images.pexels.com/photos/1144275/pexels-photo-1144275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="register_image"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LogIn;
