import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { loginUser } from "../apis/users.api.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUserData } from "../redux/slices/authSlice.js";
import { useState } from "react";

type ValuesType = {
  email: string;
  password: string;
};

type ErrorType = {
  email?: string;
  password?: string;
};


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validate = (values:ValuesType) => {
    const errors:ErrorType = {};

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
        const res = await loginUser(values);
        if(res) {
          dispatch(saveUserData(res.data));
          setTimeout(() => {
            resetForm();
            navigate("/");
          }, 3000);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <div className="flex h-screen w-screen items-center overflow-hidden px-2">
        <form onSubmit={myForm.handleSubmit} className="relative flex w-96 flex-col space-y-5 rounded-lg border bg-white px-5 py-10 shadow-xl sm:mx-auto">
          <div className="-z-10 absolute top-4 left-1/2 h-full w-5/6 -translate-x-1/2 rounded-lg bg-blue-600 sm:-right-10 sm:top-auto sm:left-auto sm:w-full sm:translate-x-0"></div>
          <div className="mx-auto mb-2 space-y-3">
            <h1 className="text-center text-3xl font-bold text-gray-700">
              Login
            </h1>
            <p className="text-gray-500">Login to access your account</p>
          </div>

          <div>
            <div className="relative mt-2 w-full">
              <input
                type="text"
                id="email"
                value={myForm.values.email}
                onChange={myForm.handleChange}
                onBlur={myForm.handleBlur}
                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
              >
                {" "}
                Enter Your Email{" "}
              </label>
            </div>
            {myForm.touched.email && myForm.errors.email && (
              <p className="text-red-500 text-xs">{myForm.errors.email}</p>
            )}
          </div>

          <div>
            <div className="relative mt-2 w-full">
              <input
                type="password"
                id="password"
                value={myForm.values.password}
                onChange={myForm.handleChange}
                onBlur={myForm.handleBlur}
                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
              >
                {" "}
                Enter Your Password
              </label>
            </div>
            {myForm.touched.password && myForm.errors.password && (
              <p className="text-red-500 text-xs">{myForm.errors.password}</p>
            )}
          </div>

          <div className="flex w-full justify-between">
            <button type="submit" className="shrink-0 inline-block w-36 rounded-lg bg-blue-600 py-3 font-bold text-white hover:cursor-pointer">
              Login
            </button>
            <button
              onClick={async () => {
                try {
                  setLoading(true);
                  const res = await loginUser({
                    email: import.meta.env.VITE_DEMO_EMAIL,
                    password: import.meta.env.VITE_DEMO_PASSWORD,
                  });

                  if(res) {
                    dispatch(saveUserData(res.data));
                    setTimeout(() => {
                      navigate("/");
                    }, 3000);
                  }
                  
                } catch (error) {
                  console.log(error);
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading}
              className="shrink-0 inline-block w-36 rounded-lg bg-blue-600 py-3 font-bold text-white hover:cursor-pointer"
            >
              Demo Login
            </button>
          </div>
          <p className="text-center text-gray-600">
            Don't have an account?
            <Link
              to="/sign-up"
              className="whitespace-nowrap font-semibold text-gray-900 hover:underline"
            >
              {"  "} Sign up
            </Link>
          </p>
        </form>
      </div>
    </>
  )
}

export default Login