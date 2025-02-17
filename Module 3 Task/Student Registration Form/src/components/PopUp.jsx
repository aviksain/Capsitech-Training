import React from "react";

function PopUp({ myForm, setShowPopUp }) {
  return (
    <>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
          <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  className="h-6 w-6 text-green-600"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Form Submitted Successfully
                </h3>
                <div className="mt-2">
                  <p className="text-xl leading-5 text-gray-500 mb-1">
                    Name: {myForm.values.name}
                  </p>
                  <p className="text-xl leading-5 text-gray-500 mb-1">
                    Age: {myForm.values.age}
                  </p>
                  <p className="text-xl leading-5 text-gray-500 mb-1">
                    Email: {myForm.values.email}
                  </p>
                  <p className="text-xl leading-5 text-gray-500 mb-1">
                    Course: {myForm.values.course}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setShowPopUp(false);
                    myForm.resetForm();
                  }}
                  className="hover:cursor-pointer inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-teal-700 hover:bg-teal-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  OK
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PopUp;
