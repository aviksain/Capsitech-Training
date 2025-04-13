import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Hero = () => {
  const user = useSelector((state: any) => state.auth.userData);

  return (
    <>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
              Stay Organized, Stay Productive.
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Less Stress, More Success!
              <br />
              Check It Off & Move On!
              <br />
              Your Personal Productivity Powerhouse!
            </p>
            <div className="mt-10 sm:mb-8 sm:flex sm:justify-center">
              {user ? (
                <Link
                  to="/todos"
                  className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                >
                  📝 Go to Dashboard -{" "}
                  <span className="font-semibold text-indigo-600">
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                    Let's Go 🚀 <span aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
              ) : (
                <Link
                  to="/sign-up"
                  className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                >
                  🔑 Unlock Productivity -{" "}
                  <span className="font-semibold text-indigo-600">
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                    Sign Up ! <span aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
        </div>
      </div>
    </>
  );
};

export default Hero;
