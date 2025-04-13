import { Link } from "react-router-dom";
import { useSelector, useDispatch
 } from "react-redux";
import { logoutUser } from "../apis/users.api";
import { deleteUserData } from "../redux/slices/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.userData);

  const handelLogout = async () => {
    try {
      await logoutUser();
      dispatch(deleteUserData());
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">TaskFlow</span>
              <img
                className="h-8 w-auto"
                src="https://www.svgrepo.com/show/356977/todo-list.svg"
                alt=""
              />
            </Link>
          </div>
          <div className=" lg:flex lg:flex-1 lg:justify-end flex items-center justify-center gap-x-6">
            {user ? (
              <>
                <button onClick={handelLogout} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:cursor-pointer">
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:cursor-pointer"
                >
                  Log in
                </Link>
                <Link
                  to="/sign-up"
                  className="text-sm/6 font-semibold text-gray-900 hover:cursor-pointer"
                >
                  Sign up <span aria-hidden="true">→</span>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
